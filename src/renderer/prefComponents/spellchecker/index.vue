<template>
  <div class="pref-spellchecker">
    <h4>拼写</h4>
    <compound>
      <template #head>
        <bool
          description="启用拼写检查"
          :bool="spellcheckerEnabled"
          :onChange="handleSpellcheckerEnabled"
        ></bool>
      </template>
      <template #children>
        <bool
          description="隐藏拼写错误标记"
          :bool="spellcheckerNoUnderline"
          :disable="!spellcheckerEnabled"
          :onChange="value => onSelectChange('spellcheckerNoUnderline', value)"
        ></bool>
        <bool
          v-show="isOsx"
          description="自动检测文档语言"
          :bool="true"
          :disable="true"
        ></bool>
        <cur-select
          v-show="!isOsx"
          description="默认拼写检查语言"
          :value="spellcheckerLanguage"
          :options="availableDictionaries"
          :disable="!spellcheckerEnabled"
          :onChange="handleSpellcheckerLanguage"
        ></cur-select>
      </template>
    </compound>

    <div v-if="isOsx && spellcheckerEnabled" class="description">
      输入时将自动检测使用的语言。可通过系统偏好设置中的"语言与地区"添加其他语言。
    </div>

    <div v-if="!isOsx && spellcheckerEnabled">
      <h6 class="title">自定义词典：</h6>
      <div class="description">编辑自定义词典中的词语。</div>
      <el-table
        :data="wordsInCustomDictionary"
        empty-text="暂无词语"
        style="width: 100%"
      >
        <el-table-column prop="word" label="词语">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button @click="handleDeleteClick(scope.row)" type="text" size="small" title="删除">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import log from 'electron-log'
import { mapState } from 'vuex'
import Compound from '../common/compound'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import { isOsx } from '@/util'
import { SpellChecker } from '@/spellchecker'
import { getLanguageName } from '@/spellchecker/languageMap'
import notice from '@/services/notification'

export default {
  components: {
    Bool,
    Compound,
    CurSelect,
    Separator
  },
  data () {
    this.isOsx = isOsx
    return {
      availableDictionaries: [],
      wordsInCustomDictionary: [],
      errorMessage: ''
    }
  },
  computed: {
    ...mapState({
      spellcheckerEnabled: state => state.preferences.spellcheckerEnabled,
      spellcheckerNoUnderline: state => state.preferences.spellcheckerNoUnderline,
      spellcheckerLanguage: state => state.preferences.spellcheckerLanguage
    })
  },
  mounted () {
    if (!isOsx) {
      this.getAvailableDictionaries()
        .then(dicts => {
          this.availableDictionaries = dicts
        })

      ipcRenderer.invoke('mt::spellchecker-get-custom-dictionary-words')
        .then(words => {
          this.wordsInCustomDictionary = words.map(word => { return { word } })
        })
    }
  },
  methods: {
    async getAvailableDictionaries () {
      const dictionaries = await SpellChecker.getAvailableDictionaries()
      return dictionaries.map(selectedItem => {
        return {
          value: selectedItem,
          label: getLanguageName(selectedItem)
        }
      })
    },
    async ensureDictLanguage (lang) {
      if (!this.spellchecker) {
        this.spellchecker = new SpellChecker(true, 'en-US')
      }
      await this.spellchecker.switchLanguage(lang)
    },

    handleSpellcheckerLanguage (languageCode) {
      this.ensureDictLanguage(languageCode)
        .then(() => {
          this.onSelectChange('spellcheckerLanguage', languageCode)
        })
        .catch(error => {
          log.error(error)
          notice.notify({
            title: '切换语言失败',
            type: 'error',
            message: error.message
          })
        })
    },
    handleSpellcheckerEnabled (isEnabled) {
      this.onSelectChange('spellcheckerEnabled', isEnabled)
    },
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    },
    handleDeleteClick (selectedItem) {
      if (selectedItem && typeof selectedItem.word === 'string') {
        ipcRenderer.invoke('mt::spellchecker-remove-word', selectedItem.word)
          .then(success => {
            if (success) {
              this.wordsInCustomDictionary = this.wordsInCustomDictionary.filter(item => item.word !== selectedItem.word)
            } else {
              notice.notify({
                title: '删除自定义词语失败',
                type: 'error',
                message: '保存时发生意外错误。'
              })
            }
          })
          .catch(error => log.error(error))
      }
    }
  }
}
</script>

<style scoped>
  .pref-spellchecker {
    & div.description {
      margin-top: 10px;
      margin-bottom: 2px;
      color: var(--iconColor);
      font-size: 14px;
    }
    & h6.title {
      font-weight: 400;
      font-size: 1.1em;
      margin-bottom: 0;
    }
  }
  .el-table, .el-table__expanded-cell {
    background: var(--editorBgColor);
  }
  .el-table button {
    padding: 1px 2px;
    margin: 5px 10px;
    color: var(--themeColor);
    background: none;
    border: none;
  }
  .el-table button:hover,
  .el-table button:active {
    opacity: 0.9;
    background: none;
    border: none;
  }
</style>
<style>
  .pref-spellchecker .el-table table {
    margin: 0;
    border: none;
  }
  .pref-spellchecker .el-table th,
  .pref-spellchecker .el-table tr {
    background: var(--editorBgColor);
  }
  .pref-spellchecker .el-table th.el-table__cell.is-leaf,
  .pref-spellchecker .el-table th,
  .pref-spellchecker .el-table td {
    border: none;
  }
  .pref-spellchecker .el-table th.el-table__cell.is-leaf:last-child,
  .pref-spellchecker .el-table th:last-child,
  .pref-spellchecker .el-table td:last-child {
    border-right: 1px solid var(--tableBorderColor);
  }
  .pref-spellchecker .el-table--border::after,
  .pref-spellchecker .el-table--group::after,
  .pref-spellchecker .el-table::before,
  .pref-spellchecker .el-table__fixed-right::before,
  .pref-spellchecker .el-table__fixed::before {
    background: var(--tableBorderColor);
  }
  .pref-spellchecker .el-table__body tr.hover-row.current-row>td,
  .pref-spellchecker .el-table__body tr.hover-row.el-table__row--striped.current-row>td,
  .pref-spellchecker .el-table__body tr.hover-row.el-table__row--striped>td,
  .pref-spellchecker .el-table__body tr.hover-row>td {
    background: var(--selectionColor);
  }
  .pref-spellchecker .el-table .el-table__cell {
    padding: 2px 0;
    margin: 4px 6px;
  }

  .pref-spellchecker li.el-select-dropdown__item {
    color: var(--editorColor);
    height: 30px;
  }
  .pref-spellchecker li.el-select-dropdown__item.hover, li.el-select-dropdown__item:hover {
    background: var(--floatHoverColor);
  }
  .pref-spellchecker div.el-select-dropdown {
    background: var(--floatBgColor);
    border-color: var(--floatBorderColor);
    & .popper__arrow {
      display: none;
    }
  }
  .pref-spellchecker input.el-input__inner {
    height: 30px;
    background: transparent;
    color: var(--editorColor);
    border-color: var(--editorColor10);
  }
  .pref-spellchecker .el-input__icon,
  .pref-spellchecker .el-input__inner {
    line-height: 30px;
  }
</style>
