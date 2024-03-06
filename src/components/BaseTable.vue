<template>
      <!-- style="width: 80%; margin: 0 auto" -->
  <div>
    <b-card
      :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
    >
      <b-table
        head-variant="light"
        style="margin: 0"
        :fields="fields"
        :items="items"
        responsive="sm"
        :dark="backgroundColor == 'dark'"
      >
        <template #cell()="data">
          <!-- button -->
          <b-row
            class="d-flex justify-content-center"
            v-if="data.field?.type == 'button'"
          >
            <div>
              <b-button
                style="margin-right: 0.5rem"
                v-show="data.item[data.field.key].includes('edit')"
                class="btn-icon btn-primary hover-info detail-button"
                variant="secondary"
                @click="EditAction(data)"
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </b-button>
              <b-button
                v-show="data.item[data.field.key].includes('delete')"
                class="btn-icon btn-primary hover-info detail-button"
                variant="danger"
                @click="DeleteAction(data)"
              >
                <i class="fa-solid fa-trash"></i>
              </b-button>
            </div>
          </b-row>
          <!-- else -->
          <b-row
            style="height: 2.5rem"
            v-else
            class="d-flex justify-content-center align-items-center"
          >
            <div>{{ data.value }}</div>
          </b-row>
        </template>
      </b-table>

      <div class="mt-3 d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-number
          last-number
        ></b-pagination>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      totalItems: 100,
    };
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    //表格項目
    items: {
      type: Array,
      required: true,
    },
    //button action
    EditAction: {
      type: Function,
      default: null,
    },
    DeleteAction: {
      type: Function,
      default: null,
    },
  },
  methods: {},
  computed: {
    ...mapState(["backgroundColor"]),
    rows() {
      return this.totalItems;
    },
  },
};
</script>
<style scoped>
.pagination {
  margin: 0;
}
</style>