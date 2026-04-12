<template>
  <div class="pref-general">
    <h4>通用</h4>
    <compound>
      <template #head>
        <h6 class="title">自动保存：</h6>
      </template>
      <template #children>
        <bool
          description="自动保存文档更改"
          :bool="autoSave"
          :onChange="value => onSelectChange('autoSave', value)"
        ></bool>
        <range
          description="文档编辑后延迟自动保存的时间"
          :value="autoSaveDelay"
          :min="1000"
          :max="10000"
          unit="ms"
          :step="100"
          :onChange="value => onSelectChange('autoSaveDelay', value)"
        ></range>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">窗口：</h6>
      </template>
      <template #children>
        <cur-select
          v-if="!isOsx"
          description="标题栏样式"
          notes="需要重启。"
          :value="titleBarStyle"
          :options="titleBarStyleOptions"
          :onChange="value => onSelectChange('titleBarStyle', value)"
        ></cur-select>
        <bool
          description="隐藏滚动条"
          :bool="hideScrollbar"
          :onChange="value => onSelectChange('hideScrollbar', value)"
        ></bool>
        <bool
          description="在新窗口中打开文件"
          :bool="openFilesInNewWindow"
          :onChange="value => onSelectChange('openFilesInNewWindow', value)"
        ></bool>
        <bool
          description="在新窗口中打开文件夹"
          :bool="openFolderInNewWindow"
          :onChange="value => onSelectChange('openFolderInNewWindow', value)"
        ></bool>
        <cur-select
          description="缩放"
          :value="zoom"
          :options="zoomOptions"
          :onChange="value => onSelectChange('zoom', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">侧边栏：</h6>
      </template>
      <template #children>
        <bool
          description="在目录中自动换行"
          :bool="wordWrapInToc"
          :onChange="value => onSelectChange('wordWrapInToc', value)"
        ></bool>

        <!-- TODO: The description is very bad and the entry isn't used by the editor. -->
        <cur-select
          description="文件夹中文件的排序方式"
          :value="fileSortBy"
          :options="fileSortByOptions"
          :onChange="value => onSelectChange('fileSortBy', value)"
          :disable="true"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">启动操作：</h6>
      </template>
      <template #children>
        <section class="startup-action-ctrl">
          <el-radio-group v-model="startUpAction">
            <!--
              Hide "lastState" for now (#2064).
            <el-radio class="ag-underdevelop" label="lastState">恢复上次编辑会话</el-radio>
            -->
            <el-radio label="folder" style="margin-bottom: 10px;">打开默认目录<span>: {{defaultDirectoryToOpen}}</span></el-radio>
            <el-button size="small" @click="selectDefaultDirectoryToOpen">选择文件夹</el-button>
            <el-radio label="blank">打开空白页</el-radio>
          </el-radio-group>
        </section>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">其他：</h6>
      </template>
      <template #children>
        <cur-select
          description="界面语言"
          :value="language"
          :options="languageOptions"
          :onChange="value => onSelectChange('language', value)"
          :disable="true"
        ></cur-select>
      </template>
    </compound>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Compound from '../common/compound'
import Range from '../common/range'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import { isOsx } from '@/util'

import {
  titleBarStyleOptions,
  zoomOptions,
  fileSortByOptions,
  languageOptions
} from './config'

export default {
  components: {
    Compound,
    Bool,
    Range,
    CurSelect,
    Separator
  },
  data () {
    this.titleBarStyleOptions = titleBarStyleOptions
    this.zoomOptions = zoomOptions
    this.fileSortByOptions = fileSortByOptions
    this.languageOptions = languageOptions
    this.isOsx = isOsx
    return {}
  },
  computed: {
    ...mapState({
      autoSave: state => state.preferences.autoSave,
      autoSaveDelay: state => state.preferences.autoSaveDelay,
      titleBarStyle: state => state.preferences.titleBarStyle,
      defaultDirectoryToOpen: state => state.preferences.defaultDirectoryToOpen,
      openFilesInNewWindow: state => state.preferences.openFilesInNewWindow,
      openFolderInNewWindow: state => state.preferences.openFolderInNewWindow,
      zoom: state => state.preferences.zoom,
      hideScrollbar: state => state.preferences.hideScrollbar,
      wordWrapInToc: state => state.preferences.wordWrapInToc,
      fileSortBy: state => state.preferences.fileSortBy,
      language: state => state.preferences.language
    }),
    startUpAction: {
      get: function () {
        return this.$store.state.preferences.startUpAction
      },
      set: function (value) {
        const type = 'startUpAction'
        this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      }
    }
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    },
    selectDefaultDirectoryToOpen () {
      this.$store.dispatch('SELECT_DEFAULT_DIRECTORY_TO_OPEN')
    }
  }
}
</script>

<style scoped>
  .pref-general {
    & .startup-action-ctrl {
      font-size: 14px;
      user-select: none;
      color: var(--editorColor);
      & .el-button--small {
        margin-left: 25px;
      }
      & label {
        display: block;
        margin: 20px 0;
      }
    }
  }
</style>
