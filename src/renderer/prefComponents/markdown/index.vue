<template>
  <div class="pref-markdown">
    <h4>Markdown</h4>
    <compound>
      <template #head>
        <h6 class="title">列表：</h6>
      </template>
      <template #children>
        <bool
          description="首选松散列表项"
          :bool="preferLooseListItem"
          :onChange="value => onSelectChange('preferLooseListItem', value)"
          more="https://spec.commonmark.org/0.29/#loose"
        ></bool>
        <cur-select
          description="无序列表首选标记"
          :value="bulletListMarker"
          :options="bulletListMarkerOptions"
          :onChange="value => onSelectChange('bulletListMarker', value)"
          more="https://spec.commonmark.org/0.29/#bullet-list-marker"
        ></cur-select>
        <cur-select
          description="有序列表首选标记"
          :value="orderListDelimiter"
          :options="orderListDelimiterOptions"
          :onChange="value => onSelectChange('orderListDelimiter', value)"
          more="https://spec.commonmark.org/0.29/#ordered-list"
        ></cur-select>
        <cur-select
          description="首选列表缩进"
          :value="listIndentation"
          :options="listIndentationOptions"
          :onChange="value => onSelectChange('listIndentation', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">Markdown扩展：</h6>
      </template>
      <template #children>
        <cur-select
          description="文档头格式"
          :value="frontmatterType"
          :options="frontmatterTypeOptions"
          :onChange="value => onSelectChange('frontmatterType', value)"
        ></cur-select>
        <bool
          description="启用Pandoc风格的上标和下标"
          :bool="superSubScript"
          :onChange="value => onSelectChange('superSubScript', value)"
          more="https://pandoc.org/MANUAL.html#superscripts-and-subscripts"
        ></bool>
        <bool
          description="启用Pandoc风格的脚注"
          notes="需要重启。"
          :bool="footnote"
          :onChange="value => onSelectChange('footnote', value)"
          more="https://pandoc.org/MANUAL.html#footnotes"
        ></bool>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">兼容性：</h6>
      </template>
      <template #children>
        <bool
          description="启用HTML渲染"
          :bool="isHtmlEnabled"
          :onChange="value => onSelectChange('isHtmlEnabled', value)"
        ></bool>
        <bool
          description="启用GitLab兼容模式"
          :bool="isGitlabCompatibilityEnabled"
          :onChange="value => onSelectChange('isGitlabCompatibilityEnabled', value)"
        ></bool>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">图表：</h6>
      </template>
      <template #children>
        <cur-select
          description="时序图主题"
          :value="sequenceTheme"
          :options="sequenceThemeOptions"
          :onChange="value => onSelectChange('sequenceTheme', value)"
          more="https://bramp.github.io/js-sequence-diagrams/"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">其他：</h6>
      </template>
      <template #children>
        <cur-select
          description="首选标题样式"
          :value="preferHeadingStyle"
          :options="preferHeadingStyleOptions"
          :onChange="value => onSelectChange('preferHeadingStyle', value)"
          :disable="true"
        ></cur-select>
      </template>
    </compound>
  </div>
</template>

<script>
import Compound from '../common/compound'
import Separator from '../common/separator'
import { mapState } from 'vuex'
import Bool from '../common/bool'
import CurSelect from '../common/select'
import {
  bulletListMarkerOptions,
  orderListDelimiterOptions,
  preferHeadingStyleOptions,
  listIndentationOptions,
  frontmatterTypeOptions,
  sequenceThemeOptions
} from './config'

export default {
  components: {
    Compound,
    Separator,
    Bool,
    CurSelect
  },
  data () {
    this.bulletListMarkerOptions = bulletListMarkerOptions
    this.orderListDelimiterOptions = orderListDelimiterOptions
    this.preferHeadingStyleOptions = preferHeadingStyleOptions
    this.listIndentationOptions = listIndentationOptions
    this.frontmatterTypeOptions = frontmatterTypeOptions
    this.sequenceThemeOptions = sequenceThemeOptions
    return {}
  },
  computed: {
    ...mapState({
      preferLooseListItem: state => state.preferences.preferLooseListItem,
      bulletListMarker: state => state.preferences.bulletListMarker,
      orderListDelimiter: state => state.preferences.orderListDelimiter,
      preferHeadingStyle: state => state.preferences.preferHeadingStyle,
      listIndentation: state => state.preferences.listIndentation,
      frontmatterType: state => state.preferences.frontmatterType,
      superSubScript: state => state.preferences.superSubScript,
      footnote: state => state.preferences.footnote,
      isHtmlEnabled: state => state.preferences.isHtmlEnabled,
      isGitlabCompatibilityEnabled: state => state.preferences.isGitlabCompatibilityEnabled,
      sequenceTheme: state => state.preferences.sequenceTheme
    })
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style scoped>
  .pref-markdown {
  }
</style>
