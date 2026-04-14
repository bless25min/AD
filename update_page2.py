import re

with open('../dr-julia/src/app/UnlockedPage.tsx', 'r', encoding='utf-8') as f:
    unlocked_content = f.read()

if 'CasesSection' not in unlocked_content:
    # Add import
    unlocked_content = unlocked_content.replace('BrandTrustSection,', 'BrandTrustSection,\n  CasesSection,')
    
    # Add component before BrandTrustSection
    target_pattern = '{/* 5. 品牌信任 */}'
    if target_pattern in unlocked_content:
        unlocked_content = unlocked_content.replace(
            target_pattern,
            '{/* 5. 示範案例 */}\n        <CasesSection />\n        {/* 6. 品牌信任 */}'
        )
        with open('../dr-julia/src/app/UnlockedPage.tsx', 'w', encoding='utf-8') as f:
            f.write(unlocked_content)
        print("Updated UnlockedPage.tsx")

print("Done.")