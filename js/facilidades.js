/***********
Select Personalizado
**********/

$(function () {
    var opts;
    var methods = {
        init: function(options) {
            opts = $.extend({
                'hiddenStyle': 'hiddenStyle'
            }, options);

            return this.each(function(){
                var $this = $(this);
                if ($this.is('select'))
                    methods.styledSelect($this);
            });
        }
        ,styledSelect: function(self){
            var span = $('<span></span>');
            var options = self.find('option');
            var title = (options.filter(":selected").val() != '') ? options.filter(":selected").text() : options.eq(0).text();
            self
                .after(
                    span
                        .attr("class", self.attr("class"))
                        .css('width', self.width() + 'px')
                        .html(title)
                )
                .addClass(opts.hiddenStyle)
                .bind('change',methods.change);
        }
        ,change: function(e){
            var span = $(this).next('span:eq(0)').text($('option:selected', this).text());
        }
        ,destroy: function(){
            return this.each(function(){
                var $this = $(this);
                $this
                    .removeClass(opts.hiddenStyle)
                    .unbind('change')
                    .next('span:eq(0)').remove();
            });
        }
    };

    $.fn.customized = function( method ){
        if ( methods[method] )
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        else if ( typeof method === 'object' || ! method )
            return methods.init.apply( this, arguments );
        else
            $.error( 'Method ' +  method + ' does not exist on jQuery.customized' );
    };
});
