<template>
  <!-- style="width: 80%; margin: 0 auto" -->
  <div>
    <b-card :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'">
      <b-table
        responsive="true"
        sticky-header="50rem"
        head-variant="light"
        style="margin: 0"
        :fields="fields"
        :items="items"
        :dark="backgroundColor == 'dark'"
      >
        <template #cell()="data">
          <!-- text_btn -->
          <!-- EX:data = { text: "datatext", variant: "danger"}; -->
          <b-row
            class="d-flex justify-content-center"
            v-if="data.field?.type == 'text_btn'"
            style="padding-left: 0.5rem"
          >
            <div class="d-flex flex-gap">
              <b-button
                v-for="(item, index) in data.item[data.field.key]"
                :key="index"
                class="btn-icon"
                :variant="item.variant"
                @click="text_btnFunction(data.field.key, data.index, index)"
              >
                <!-- <i>edit</i> -->
                <i>{{ item.text }}</i>
              </b-button>
            </div>
          </b-row>
          <!-- icon_btn -->
          <!-- (bootstrap vue icon) EX:data = { icon: "pencil-square", variant: "danger"}; -->
          <b-row
            class="d-flex justify-content-center"
            v-else-if="data.field?.type == 'icon_btn'"
            style="padding-left: 0.5rem"
          >
            <div class="d-flex flex-gap">
              <b-button
                v-for="(item, index) in data.item[data.field.key]"
                :key="index"
                class="btn-icon"
                :variant="item.variant"
                @click="icon_btnFunction(data.field.key, data.index, index)"
              >
                <b-icon :icon="item.icon"></b-icon>
              </b-button>
            </div>
          </b-row>
          <!-- default_btn -->
          <!-- EX:data = "edit,delete" -->
          <b-row
            class="d-flex justify-content-center"
            v-else-if="data.field?.type == 'default_btn'"
            style="padding-left: 0.5rem"
          >
            <div class="d-flex flex-gap">
              <b-button
                v-show="data.item[data.field.key].includes('edit')"
                class="btn-icon"
                variant="secondary"
                @click="editAction(data.field.key, data.index)"
              >
                <b-icon icon="pencil-square"></b-icon>
              </b-button>
              <b-button
                v-show="data.item[data.field.key].includes('delete')"
                class="btn-icon hover-info detail-button"
                variant="danger"
                @click="deleteAction(data.field.key, data.index)"
              >
                <b-icon icon="trash"></b-icon>
              </b-button>
            </div>
          </b-row>
          <!-- style_Cstm -->
          <!-- EX:data = { text: "datatext", style: "color:#dc3545 ; border:2px solid
          red" }; -->
          <b-row
            style="height: 2.5rem; min-width: 8rem"
            v-else-if="data.field?.type == 'style_Cstm'"
            :style="data.value.style"
            class="d-flex justify-content-center align-items-center text-nowrap"
          >
            <div>{{ data.value.text }}</div>
          </b-row>
          <!-- else -->
          <b-row
            style="height: 2.5rem; min-width: 8rem"
            v-else
            class="d-flex justify-content-center align-items-center text-nowrap"
          >
            <div>{{ data.value }}</div>
          </b-row>
        </template>
      </b-table>

      <div class="mt-3 d-flex justify-content-end">
        <b-pagination
          v-model="nowPage"
          :total-rows="totalItems"
          :per-page="perPage"
          first-number
          last-number
          @change="clickPagination"
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
      nowPage: 1,
    };
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    totalItems: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },

    //icon_btn Function
    icon_btnFunction: {
      type: Function,
      default: null,
    },
    //text_btn Function
    text_btnFunction: {
      type: Function,
      default: null,
    },
    //default_btn
    editAction: {
      type: Function,
      default: null,
    },
    deleteAction: {
      type: Function,
      default: null,
    },

    clickPage: {
      type: Function,
      default: null,
    },
  },
  methods: {
    clickPagination() {
      setTimeout(() => {
        this.clickPage(this.nowPage);
      }, 100);
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
  },
  watch: {
    currentPage() {
      setTimeout(() => {
        this.nowPage = this.currentPage;
      }, 100);
    },
  },
};
</script>
<style scoped>
.pagination {
  margin: 0;
}
.flex-gap > * {
  margin-right: 0.2rem;
}
.flex-gap > *:last-child {
  margin-right: 0;
}
</style>