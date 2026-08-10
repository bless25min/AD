import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { mediaStories, storySite } from '../content/media-stories.mjs';
import {
  renderLlms,
  renderRobots,
  renderSitemap,
  renderStoryLibrary,
  renderStoryPage,
} from './lib/render-media-story.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = fileURLToPath(new URL('../public/', import.meta.url));

function validateStories(stories) {
  if (stories.length !== 10) throw new Error(`Expected 10 media stories, received ${stories.length}`);
  if (new Set(stories.map((story) => story.slug)).size !== stories.length) throw new Error('Story slugs must be unique');
  if (new Set(stories.map((story) => story.headline)).size !== stories.length) throw new Error('Story headlines must be unique');

  for (const story of stories) {
    const required = ['slug', 'industry', 'headline', 'metaDescription', 'answerSummary', 'heroImage'];
    for (const field of required) {
      if (!story[field]) throw new Error(`${story.slug || 'Unknown story'} is missing ${field}`);
    }
    if (story.sections.length < 3 || story.faq.length < 3) throw new Error(`${story.slug} needs full article and FAQ content`);
  }
}

async function write(path, contents) {
  await mkdir(new URL('./', path), { recursive: true });
  await writeFile(path, contents.replace(/[ \t]+$/gm, ''), 'utf8');
}

async function generate() {
  validateStories(mediaStories);
  const storiesRoot = new URL('stories/', new URL(`file:///${publicRoot.replaceAll('\\', '/')}/`));

  await Promise.all(mediaStories.map((story, index) => {
    const related = [1, 2, 3].map((offset) => mediaStories[(index + offset) % mediaStories.length]);
    return write(new URL(`${story.slug}/index.html`, storiesRoot), renderStoryPage(story, related, storySite));
  }));

  await Promise.all([
    write(new URL('index.html', storiesRoot), renderStoryLibrary(mediaStories, storySite)),
    write(new URL('sitemap.xml', new URL(`file:///${publicRoot.replaceAll('\\', '/')}/`)), renderSitemap(mediaStories, storySite)),
    write(new URL('robots.txt', new URL(`file:///${publicRoot.replaceAll('\\', '/')}/`)), renderRobots(storySite)),
    write(new URL('llms.txt', new URL(`file:///${publicRoot.replaceAll('\\', '/')}/`)), renderLlms(mediaStories, storySite)),
  ]);

  console.log(`Generated ${mediaStories.length} industry stories in ${projectRoot}`);
}

await generate();
