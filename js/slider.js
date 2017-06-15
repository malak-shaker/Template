var sliders = $('.slider-container');
var sliderObjects = [];

for(var i = 0;i<sliders.length;i++){

	var sliderObject = {};

	sliderObject.position = 0;

	var myslider = $(sliders[i]).children('.myslider');

	var dataSlides = myslider.attr('data-show-slides');

	sliderObject.dataSlides = (dataSlides!=undefined)? parseInt(dataSlides) : 1;

	var images_container = myslider.children('.images_container')

	sliderObject.images_container = images_container;

	sliderObject.imagesCount = images_container.children().length;

	images_container.append($('<div>',{class:'clr'}));

	sliderObject.slides = Math.ceil(sliderObject.imagesCount/sliderObject.dataSlides);


	if(myslider.attr('data-dots')=='true'){
		var dotscontainer = $('<div>',{class:'dots-container'});
		sliderObject.dotscontainer = dotscontainer;
	
		for(var j = 0;j<sliderObject.slides;j++){
			if(j==0){
				$('<div>',{class:'dot active','data-dot-nav':true}).appendTo(dotscontainer);
			}
			else{
				$('<div>',{class:'dot','data-dot-nav':true}).appendTo(dotscontainer);
			}
		}
		dotscontainer.appendTo(myslider);
	}


	var sliderWidthPercentage = 100*sliderObject.slides;
	sliderObject.imageWidthPercentage = 100/(sliderObject.slides*sliderObject.dataSlides); 
	images_container.css('width',sliderWidthPercentage+'%');
	images_container.children('.slide').css({'width': sliderObject.imageWidthPercentage+'%'});	
	sliderObject.autoplay = (myslider.attr('data-autoplay')=='true');

	sliderObjects.push(sliderObject);
} 


$('[data-prev-slide]').click(function(){

	var sliderIndex = getSliderIndex(this);
	if(sliderObjects[sliderIndex].position!=0){
		sliderObjects[sliderIndex].position--;
		translateImages(sliderIndex);
	}
});


$('[data-next-slide]').click(function(){
	
	var sliderIndex = getSliderIndex(this);

	if(sliderObjects[sliderIndex].position!=sliderObjects[sliderIndex].slides-1){
		sliderObjects[sliderIndex].position++;
		translateImages(sliderIndex);
	}

});		



function getSliderIndex(element){
	for(var i = 0;i<sliders.length;i++){
		if($.contains(sliders[i],element)){
			return i;
		}
	}
}


function translateImages(i){

	var extra = sliderObjects[i].imagesCount%sliderObjects[i].dataSlides;
	if(sliderObjects[i].position==sliderObjects[i].slides-1 && extra != 0){
		translation = sliderObjects[i].imageWidthPercentage*(sliderObjects[i].position-1)*sliderObjects[i].dataSlides + extra*sliderObjects[i].imageWidthPercentage;
		sliderObjects[i].images_container.css('transform', 'translateX(' + '-'+translation+'%' + ')');
	}
	else{
		sliderObjects[i].images_container.css('transform', 'translateX(' + '-'+sliderObjects[i].imageWidthPercentage*sliderObjects[i].position*sliderObjects[i].dataSlides+'%' + ')');
	}
	sliderObjects[i].dotscontainer.children('.dot').removeClass('active');
	$(sliderObjects[i].dotscontainer.children()[sliderObjects[i].position]).addClass('active');

}


$('[data-dot-nav]').click(function(){

	var sliderIndex = getSliderIndex(this);
	sliderObjects[sliderIndex].position = $(this).index();
	translateImages(sliderIndex);

});


window.setInterval(function(){
	for(var i = 0;i<sliderObjects.length;i++){
		if(sliderObjects[i].autoplay){
			sliderObjects[i].position++;
			sliderObjects[i].position%=sliderObjects[i].slides;
			translateImages(i);
		}
	}
}, 5000);

