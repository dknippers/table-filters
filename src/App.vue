<script setup lang="ts">
import TableComponent from "./components/table/TableComponent.vue";
import type { Column } from "./components/table/types";
import Text from "./components/Text.vue";

type Person = {
  name: string;
  birthday: Date;
  age: number;
};

const p1: Person = {
  name: "dani",
  birthday: new Date(1987, 9, 6),
  age: 37,
}

const p2: Person = {
  name: "chen",
  birthday: new Date(1986, 10, 11),
  age: 38
}

const columns: Column<Person>[] = [
  {
    name: "Name",
    value: person => person.name,
  },
  {
    name: "Age",
    render: person => ({
      component: Text,
      props: {
        text: person.age
      }
    })
  }
]
const data = [p1, p2];

</script>

<template>
  <main>
    <TableComponent :columns="columns" :data="data" />
  </main>
</template>
