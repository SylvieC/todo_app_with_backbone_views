SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],
  showTemplate: HandlebarsTemplates['todos/show'],

  events: {
    "submit #addTodo": "addTodo",
    "click #removeTodo": "deleteTodo"
  },

  render: function() {
    $(this.el).html(this.template());

    _.each(this.collection, function(someTodo) {
      show_view = new SpaApp.Views.TodosShow({
        model: someTodo
      });
      this.$el.append(show_view.render().el);
    }, this);

    return this;
  },

  addTodo: function(event) {
    event.preventDefault();

    var newTodo = {
      title: $("#todo_title").val(),
      completed: false
    };

    $.ajax({
      context: this,
      type: 'post',
      url: '/todos.json',
      data: {
        todo: newTodo
      }
    }).done(function(createdTodo) {
      show_view = new SpaApp.Views.TodosShow({
        model: createdTodo
      });
      this.$el.append(show_view.render().el);
    });
  },



});

//   $.ajax({
//     type: "POST",
//     url: '/todos.json',
//     context: this,
//     data: {
//       todo: newTodo
//     }
//   }).done(function(todo) {
//     var todoView = new SpaApp.Views.TodosShow({
//       model: todo
//     });
//     this.$el.append(todoView.render().el);
//   });
// }



// createOnEnter: function(event){
//  event.preventDefault();
//  var newTodo = {title: $("#todo_title").val(),
//    completed: false};
//  console.log(newTodo);  


// addToDo: function(event) {
//   event.preventDefault();
//   var newTodo = {
//     title: this.input.val(),
//     completed: false
//   };
//   console.log(this);
//   $.post('/todos.json', {
//     todo: newTodo
//   }).done(function(data) {

//     var TodosIndex = HandlebarsTemplates['todos/show'](data);
//     $('#todos').append(TodosIndex);
//     $("addTodo").value('');
//   });

// }



// SpaApp.Views.TodosIndex = Backbone.View.extend({
//   id: 'todos',

//   template: HandlebarsTemplates['todos/index'],

//   events: {
//     'submit #addTodo': 'addTodo'
//   },

//   render: function() {
//     $(this.el).html(this.template());

//     var todoView;
//     _.each(this.collection, function(someTodo) {
//       todoView = new SpaApp.Views.TodosShow({
//         model: someTodo
//       });
//       this.$el.append(todoView.render().el);
//     }, this);

//     return this;
//   },


// });