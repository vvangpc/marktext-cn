<template>
  <section class="image-folder">
    <h5>全局或相对图片文件夹</h5>
    <text-box description="全局图片文件夹" :input="imageFolderPath"
      :regexValidator="/^(?:$|([a-zA-Z]:)?[\/\\].*$)/" :defaultValue="folderPathPlaceholder"
      :onChange="value => modifyImageFolderPath(value)"></text-box>
    <div>
      <el-button size="mini" @click="modifyImageFolderPath(undefined)">打开...</el-button>
      <el-button size="mini" @click="openImageFolder">在文件夹中显示</el-button>
    </div>
    <compound>
      <template #head>
        <bool description="首选相对资源文件夹"
          more="https://github.com/marktext/marktext/blob/develop/docs/IMAGES.md"
          :bool="imagePreferRelativeDirectory"
          :onChange="value => onSelectChange('imagePreferRelativeDirectory', value)"></bool>
      </template>
      <template #children>
        <text-box description="相对图片文件夹名称" :input="imageRelativeDirectoryName"
          :regexValidator="/^(?:$|(?![a-zA-Z]:)[^\/\\].*$)/"
          :defaultValue="relativeDirectoryNamePlaceholder"
          :onChange="value => onSelectChange('imageRelativeDirectoryName', value)"></text-box>
        <div class="footnote">
          在上方文本框中使用 <code>${filename}</code> 可自动插入文档文件名。
        </div>
      </template>
    </compound>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { shell } from 'electron'
import Bool from '@/prefComponents/common/bool'
import Compound from '@/prefComponents/common/compound'
import TextBox from '@/prefComponents/common/textBox'

export default {
  components: {
    Bool,
    Compound,
    TextBox
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      imageFolderPath: state => state.preferences.imageFolderPath,
      imagePreferRelativeDirectory: state => state.preferences.imagePreferRelativeDirectory,
      imageRelativeDirectoryName: state => state.preferences.imageRelativeDirectoryName
    }),
    imageInsertAction: {
      get: function () {
        return this.$store.state.preferences.imageInsertAction
      }
    },
    folderPathPlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageFolderPath || ''
      }
    },
    relativeDirectoryNamePlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageRelativeDirectoryName || 'assets'
      }
    }
  },
  methods: {
    openImageFolder () {
      shell.openPath(this.imageFolderPath)
    },
    modifyImageFolderPath (value) {
      return this.$store.dispatch('SET_IMAGE_FOLDER_PATH', value)
    },
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style scoped>
.image-folder .footnote {
  font-size: 13px;
  & code {
    font-size: 13px;
  }
}
</style>
