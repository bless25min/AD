import re

# Update index.ts
with open('../dr-julia/src/features/landing/index.ts', 'r', encoding='utf-8') as f:
    index_content = f.read()

if 'CasesSection' not in index_content:
    index_content += '\nexport { CasesSection } from \'./sections/CasesSection\''
    with open('../dr-julia/src/features/landing/index.ts', 'w', encoding='utf-8') as f:
        f.write(index_content)

# Update PreLoginPage.tsx
with open('../dr-julia/src/app/PreLoginPage.tsx', 'r', encoding='utf-8') as f:
    prelogin_content = f.read()

if 'CasesSection' not in prelogin_content:
    # Add import
    prelogin_content = prelogin_content.replace('LocationMapSection,', 'LocationMapSection,\n  CasesSection,')
    
    # Add component before BrandTrustSection
    target_pattern = '{/* 10. 品牌信任 */}'
    if target_pattern in prelogin_content:
        prelogin_content = prelogin_content.replace(
            target_pattern,
            '{/* 10. 示範案例 */}\n        <CasesSection />\n        {/* 11. 品牌信任 */}'
        )
        with open('../dr-julia/src/app/PreLoginPage.tsx', 'w', encoding='utf-8') as f:
            f.write(prelogin_content)
        print("Updated PreLoginPage.tsx")

# Update UnlockedPage.tsx
with open('../dr-julia/src/app/UnlockedPage.tsx', 'r', encoding='utf-8') as f:
    unlocked_content = f.read()

if 'CasesSection' not in unlocked_content:
    # Add import
    unlocked_content = unlocked_content.replace('BrandTrustSection,', 'BrandTrustSection,\n  CasesSection,')
    
    # Add component before BrandTrustSection
    target_pattern2 = '{/* 10. 品牌信任 */}'
    if target_pattern2 in unlocked_content:
        unlocked_content = unlocked_content.replace(
            target_pattern2,
            '{/* 10. 示範案例 */}\n        <CasesSection />\n        {/* 11. 品牌信任 */}'
        )
        with open('../dr-julia/src/app/UnlockedPage.tsx', 'w', encoding='utf-8') as f:
            f.write(unlocked_content)
        print("Updated UnlockedPage.tsx")

print('Modifications complete.')