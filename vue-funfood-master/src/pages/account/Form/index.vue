<template>
  <div>
    <h2>Creat account</h2>
    <a-card>
      <a-form style="width: 50%;margin: auto">
        <a-form-item label="Name">
          <a-input  placeholder="Name role"/>
        </a-form-item>
        <a-form-item label="Password">
          <a-input  placeholder="Password"/>
        </a-form-item>
        <a-form-item label="Select role">
          <a-select
              mode="single"
              style="width: 100%"
              placeholder="Please select"
              >
            <a-select-option >
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-button style="margin-right: 15px">
        </a-button>
        <a-button>
          Clear
        </a-button>
      </a-form>
    </a-card>
  </div>

</template>

<script>

</script>