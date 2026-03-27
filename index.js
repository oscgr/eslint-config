import antfu from '@antfu/eslint-config'
import vuetify from 'eslint-plugin-vuetify'

/**
 * Generate eslint configuration.
 * @param {object} config
 * @param {boolean | undefined} config.vue - Is the project a vue Project
 * @param {2 | 3 | undefined} config.vueVersion - Vue version. Defaults to 3
 * @param {boolean | undefined} config.vuetifyMigration - Is the project is migrating from Vuetify 2 to 3
 * @param {any[] | undefined} additionalUserConfigs - additional custom configs
 */
const Config = (config, ...additionalUserConfigs) => {
  const { vue = true, vueVersion = 3, vuetifyMigration = false } = config
  return antfu(
    {
      vue: vue && {
        vueVersion,
        sfcBlocks: {
          blocks: {
            styles: false, // disable CSS linter with eslint - use stylelint
          },
        },
        overrides: {
          // EXPLANATION : Use v-dompurify-html to prevent XSS attacks
          'vue/no-v-html': 'error',

          // EXPLANATION : v-slot syntax of some Vuetify 2.X components can trigger this rule - will try to reactivate with Vuetify 3
          'vue/valid-v-slot': 'off',
          // EXPLANATION : If you know what you're doing, it's fine
          'vue/no-v-text-v-html-on-component': 'off',

          // EXPLANATION : default component tags order
          'vue/block-order': [
            'error',
            {
              order: [['template', 'script'], 'style'],
            },
          ],

          // EXPLANATION : no restriction (kebab case most of the time)
          'vue/custom-event-name-casing': 'off',

          'vue/no-unused-refs': 'off',
          'vue/max-attributes-per-line': [
            'error',
            {
              singleline: {
                max: 3,
              },
              multiline: {
                max: 1,
              },
            },
          ],
        },
      },
      typescript: {
        overrides: {
          'ts/no-use-before-define': 'off',
        },
      },
      javascript: {
        overrides: {
          'no-use-before-define': 'off',
        },
      },
      stylistic: {
        overrides: {
          'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
          'style/space-before-function-paren': ['error', 'never'],
          'style/linebreak-style': ['error', 'unix'],
        },
      },
      rules: {
        'antfu/top-level-function': 'off',
        'regexp/no-unused-capturing-group': 'off',
      },
    },
    [
      ...(vuetifyMigration ? vuetify.configs['flat/recommended'] : []),
      ...(additionalUserConfigs || []),
    ],
  )
}

// For external use, with args
export { Config }
// For internal use, or default use without args (no Vue)
export default Config({ vue: false })
