<template>
  <div class="components-container">
    
    <div>
      <Tinymce :height=200 ref="editor" v-model="content"></Tinymce>
    </div>
    <div class='editor-content' > {{content}}</div>
  </div>
</template>

<script>
    import Tinymce from 'components/Tinymce';

    export default {
      components: { Tinymce },
      data() {
        return {
          content: 'Tinymce'
        }
      }
    };
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


