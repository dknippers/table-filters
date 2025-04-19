<script setup lang="ts">
import TableComponent from "./components/table/TableComponent.vue";
import type { Column } from "./components/table/types";
import Text from "./components/Text.vue";

type Person = {
  name: string;
  age: number;
};

const p1: Person = {
  name: "dani",
  age: 37,
}

const p2: Person = {
  name: "chen",
  age: 38
}

const columns: Column<Person>[] = [
  {
    header: "Name",
    value: person => person.name,
  },
  {
    header: "Age",
    render: person => ({
      component: Text,
      props: {
        text: person.age
      }
    })
  },
  {
    header: "Combined",
    value: person => `${person.name} is ${person.age} years old`,
  },
]
const data = [p1, p2];

</script>

<template>
  <main>
    <TableComponent :columns="columns" :data="data" />
  </main>
</template>
