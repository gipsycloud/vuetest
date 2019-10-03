<template>
  <v-card max-width="500" class="mx-auto">
    <v-toolbar color="pink" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Inbox</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group v-model="selected" multiple active-class="pink--text" >
        <template v-for="(item, index) in itemsToBind">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-icon v-if="!active" color="grey lighten-1">
                  star_border
                </v-icon>

                <v-icon v-else color="yellow" > star</v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
      <div class="edit-btn">
        <v-btn @click="dialog = true" class="mx-2" fab dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-list>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500" >
      <template v-slot:activator="{ on }"></template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title > Privacy Policy </v-card-title>

        <v-card-text>
          {{ newMessage }}
          <v-form v-model="valid">
            <v-container>
              <v-text-field v-model="newMessage.headline" label="headline"></v-text-field>
              <v-text-field v-model="newMessage.title" label="title"></v-text-field>
              <v-text-field v-model="newMessage.subtitle" label="subtitle"></v-text-field>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false" >Add</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selected: [2],
      dialog: false,
      newMessage: {},
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),
    computed: {
      itemsToBind: function () {
        this.items.forEach(function(item) {
          if(item.time) {
            var diff = Math.abs(new Date() - item.time)
            var mins = Math.floor((diff/1000)/60)
            item.action = mins = ' min'
          }
        })
        return this.items;
      }
    },
    methods: {
      addMessage () {
        this.newMessage.time = new Date();
        this.items.push({...this.newMessage});
        this.dialog = false;
      },
      toggle(index) {
        const i = this.selected.indexOf(index);
        if (i > -1) {
          this.selected.splice(i, 1);
        } else {
          this.selected.push(index);
        }
      }
    }
  }
</script>
<style media="screen">
  .edit-btn {
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
</style>
