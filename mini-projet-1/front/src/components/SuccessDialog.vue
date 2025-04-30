<template>
  <div v-if="show" class="dialog success-dialog">
    <p>{{ message }}</p>
    <button @click="closeDialog">OK</button>
  </div>
</template>

<script>
export default {
  name: 'SuccessDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: 'Opération réussie !'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.dialog {
  background: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
  text-align: center;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 1000;
}
button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
