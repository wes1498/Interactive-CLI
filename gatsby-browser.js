/**
 * Implement Gatsby's Browser APIs in this file.
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import terminal from 'imports-loader?define=>false!jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css'; //import css
import unix from 'imports-loader?define=>false!jquery.terminal/js/unix_formatting';
const $ = terminal(window);
unix(window, $);

// import $ from 'jquery';
// import terminal from 'imports-loader?define=>false!jquery.terminal';
// terminal(window, $);

terminal(window, $);

export const onInitialClientRender = () => {
  $(function() {
    $.fn.tilda = function(ev, options) {
        if ($('body').data('tilda')) {
            return $('body').data('tilda').terminal;
        }
        this.addClass('tilda');
        options = options || {};
        ev = ev || function(command, term) {
            term.echo("you don't set ev for tilda");
        };
        var settings = {
            prompt: '[[b;lightgreen;]wesley:/~ ] ',
            name: 'tilda',
            height: 100,
            enabled: false,
            greetings: function(callback) {
                this.echo('[[b;aqua;black]Hello, my name is Wesley!\n]')
                this.echo('Press ` to minimize the terminal. The available commands are:')
                this.echo('[[b;red;black;]cd], [[b;red;black;]ls], [[b;red;black;]cat], [[b;red;black;]open], (to open .pdf and .jpg files)')
                callback();
            },
            keypress: function(e) {
                if (e.which == 96) {
                    return false;
                }
            }
        };
        if (options) {
            $.extend(settings, options);
        }
        this.append('<div class="td"></div>');
        var self = this;
        self.terminal = this.find('.td').terminal(ev,
                                               settings);
        var focus = false;
        $(document.documentElement).keypress(function(e) {
            if (e.charCode == 96) {
                self.slideToggle('fast');
                self.terminal.command_line.set('');
                self.terminal.focus(focus = !focus);
            }
        });
        $('body').data('tilda', this);
        this.hide();
        return self;
    }
    $('body').terminal({
        cd: function(value) {
         
        },
        ls: {
           get: function(arg) {
           }
        },
        cat: function(arg1, arg2) {
        },
        open: function(value) {

        }
    }, {
        autocompleteMenu: true,
        completion: [],
        prompt: "[[b;lightgreen;]wesley:/~ ]",
        checkArity: false,
        greetings: function(callback) {
            this.echo('[[b;aqua;black]Hello, my name is Wesley!\n]')
            this.echo('Press ` to minimize the terminal. The available commands are:')
            this.echo('[[b;red;black;]cd], [[b;red;black;]ls], [[b;red;black;]cat], [[b;red;black;]open], (to open .pdf and .jpg files)')
            callback();
        }
    });
});

}