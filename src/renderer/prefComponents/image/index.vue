<template>
  <div class="pref-image">
    <h4>图片</h4>
    <section class="image-ctrl">
      <div>从本地文件夹或剪贴板插入图片后的默认操作
        <el-tooltip class='item' effect='dark'
          content='剪贴板处理仅在macOS和Windows上完全支持。'
          placement='top-start'>
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <CurSelect :value="imageInsertAction" :options="imageActions"
        :onChange="value => onSelectChange('imageInsertAction', value)"></CurSelect>
    </section>
    <Separator />
    <FolderSetting v-if="imageInsertAction === 'folder' || imageInsertAction === 'path'" />
    <Uploader v-if="imageInsertAction === 'upload'" />
  </div>
</template>

<script>
import Separator from '../common/separator'
import Uploader from './components/uploader'
import CurSelect from '@/prefComponents/common/select'
import FolderSetting from './components/folderSetting'
import { imageActions } from './config'

export default {
  components: {
    Separator,
    CurSelect,
    FolderSetting,
    Uploader
  },
  data () {
    this.imageActions = imageActions

    return {}
  },
  computed: {
    imageInsertAction: {
      get: function () {
        return this.$store.state.preferences.imageInsertAction
      }
    }
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style>
.pref-image {
  & .image-ctrl {
    font-size: 14px;
    margin: 20px 0;
    color: var(--editorColor);
    & label {
      display: block;
      margin: 20px 0;
    }
  }
}
</style>
