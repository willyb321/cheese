<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex>
        <vue2-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue2-dropzone>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';

  export default {
    name: 'FileUpload',
    data() {
      return {
        dropzoneOptions: {
          url: '/api/i/upload',
          thumbnailWidth: 150,
          maxFilesize: 5,
          headers: {}
        }

      };
    },
    props: {},
    components: {vue2Dropzone},
    computed: {},
    methods: {}
  };
</script>
