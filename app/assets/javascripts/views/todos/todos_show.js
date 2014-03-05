SpaApp.Views.TodosShow = Backbone.View.extend({

  className: function() {
    if (this.model.completed) {
      return 'done done-true';
    } else {
      return 'done';
    }
  },


  template: HandlebarsTemplates['todos/show'],

  events: {
    "click .removeTodo": "deleteTodo",
    'click input[type="checkbox"]': "update"
  },

  render: function() {
    $(this.el).html(this.template(this.model));
    return this;
  },

  update: function(event) {
    var checkbox = event.target;
    this.model.completed = checkbox.checked;

    $.ajax({
      context: this,
      type: 'patch',
      url: '/todos/' + this.model.id + '.json',
      data: {
        todo: this.model
      }
    }).done(function(data) {
      $(this.el).toggleClass("done-true");
    });
  },


  deleteTodo: function(event) {
    $.ajax({
      context: this,
      type: 'delete',
      url: '/todos/' + this.model.id
    }).done(function(data) {
      this.remove();
    });
  }

});