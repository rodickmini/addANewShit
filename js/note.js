(function ($) {
    var Note = Backbone.Model.extend({
        defaults: {
            name: 'default name',
            bg_color: 'yellow',
            marg: '20',
            del: 'false'
        },

        initialize: function(){
            if(!this.get("name")){
                this.set({"name": this.defaults.name});
            }
            if(!this.get("bg_color")){
                this.set({"bg_color": this.defaults.bg_color});
            }
            if(!this.get("marg")){
                this.set({"marg": this.defaults.marg});
            }
            if(!this.get("del")){
                this.set({"del": this.defaults.del});
            }
        }

    });

    var NoteList = Backbone.Collection.extend({
        model: Note,
        localStorage: new Backbone.LocalStorage("notes-backbone")
    });

    var noteList = new NoteList;

    var NoteView = Backbone.View.extend({
        model: {},

        tagName: "li",

        template: _.template($("#note_template").html()),

        events:{
            "click .destroy": "delItem",
            "click .each_color": "setBg"
        },

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.attr("class",this.model.get("bg_color")+"_li");
            this.$el.attr("style","margin: "+this.model.get("marg")+"px");
            return this;
        },

        delItem: function(){
//            this.model.save({del: "true"});
            this.model.destroy();
        },

        setBg: function(e){
            var bg_color = e.target.className;
            var temp = bg_color.substring(11,bg_color.length-4);
            this.model.save({bg_color: temp});
        }


    });

    var AppView = Backbone.View.extend({
        el: $("#notes_container"),

        events:{
            "click #note_button" : "addItem",
            "click #input_color_board .each_color": "chooseColor",
            "click #redo a": "redo_last"
        },

        initialize: function(){
            noteList.on("add", this.addOne, this);
            noteList.on('reset', this.addAll, this);//初始化加载集合全体
            noteList.fetch();
        },

        addOne: function(note){
            var view = new NoteView({model: note});
//            if(view.model.get("del") == "false"){
                this.$("#list").append(view.render().el);
//            }
        },

        addAll: function() {//将集合中的model遍历出来
            noteList.each(this.addOne);
        },

        addItem: function() {
            this.input = this.$("#note_input");
            if (!this.input.val()) return;
            var ran_margin = parseInt(Math.random()*(60-10+1)+0);
            noteList.create({name: this.input.val(), bg_color: this.bg_color, marg: ran_margin});//在集合中创建一个模型
            this.input.val('');
        },

        chooseColor: function(e){
            if(e.target.className == "each_color red_div"){
                this.$("#note_input").css("background-color", "#ffded6");
                this.bg_color = "red";
            }
            else if(e.target.className == "each_color green_div"){
                this.$("#note_input").css("background-color", "#bbf3d3");
                this.bg_color = "green";
            }
            else if(e.target.className == "each_color blue_div"){
                this.$("#note_input").css("background-color", "#b9ecff");
                this.bg_color = "blue";
            }
            else if(e.target.className == "each_color yellow_div")
            {
                this.$("#note_input").css("background-color", "rgb(248, 248, 159)");
                this.bg_color = "yellow";
            }
            else{
                alert(e.target.className + "error!");
            }
        },

        redo_last: function(){
            alert("!");
        }
    });

    var app = new AppView;

})(jQuery);