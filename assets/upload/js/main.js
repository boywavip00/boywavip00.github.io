$(function() {

	$('[data-toggle="tooltip"]').tooltip()

	// hieu ung filter
	$('#room-map .list-room').isotope({
		itemSelector:".room-item"
	});
	$('#general-information .list-information .list-room').isotope({
		itemSelector:".room-item"
	});

	autoSize();
	$(window).resize(function(event) {
		autoSize();
	});

	function autoSize(){
		var window_height = $(window).height();
		var window_width = $(window).width();

		var height_main = window_height - 60;
		$('#main-content').css({"height": height_main + 'px'});

		var height_background_login = window_height;
		var width_background_login = window_width;
		$('#background-login').css({"height": height_background_login + 'px',"width": width_background_login+'px'});

		if(window_width < 1200){
			$('.sidenav').removeClass('active');
			$('.resize-menu').addClass('d-none');
		} else if(window_width >= 1200){
			$('.sidenav').addClass('active');
			$('.resize-menu').removeClass('d-none');
			$('.overplay').removeClass('active');
		}
	}

	//on-off thanh menu
	$('#on-off-menu').click(function(event) {
		$('.sidenav').addClass('active');
		$('.overplay').addClass('active');
		$('.overplay').css({"z-index": 90});
	});
	//on-off thanh menu setting
	$('#on-off-setting').click(function(event) {
		$('.sidenav-setting').addClass('active');
		$('.overplay').addClass('active');
	});
	//on thanh thao tác phòng
	$('#room-map .list-room .room-item .item-room .room-status').click(function(event) {
		$('#room-map .manipulation-room').addClass('active');
		$('.overplay').addClass('active');
		$('.overplay').css({"z-index": 98});
	});
	//on-off thao tac phòng
	$('.overplay').click(function(event) {
		var window_width = $(window).width();
		if(window_width < 1200){
			$('.sidenav').removeClass('active');
		}

		$('.overplay').removeClass('active');
		$('.sidenav-setting').removeClass('active');
		$('#room-map .manipulation-room').removeClass('active');
	});
	//on menu child
	$('a.open-menu-child').click(function(event) {
		$(this).next().addClass('active');
		$('.overplay-white').addClass('active');
		return false;
	});
	$('.overplay-white').click(function(event) {
		$('.overplay-white').removeClass('active');
		$('a.open-menu-child').next().removeClass('active');
	});

	//co dãn menu
	$('.resize-menu').click(function(event) {
		$('.sidenav .list-content>ul>li a span').toggleClass('d-none');
		$('.sidenav .list-content>ul>li>a i.fa-angle-right').toggleClass('d-none');
		$('.sidenav .list-content>ul>li>ul').toggleClass('d-none');
		$('.sidenav header .name-header').toggleClass('d-none');
		
		if ($(this).hasClass('left')) {
			$('.resize-menu .fa-long-arrow-alt-right').addClass('fa-long-arrow-alt-left').removeClass('fa-long-arrow-alt-right');
			$(this).removeClass('left');
			$('.sidenav').css({"width": 260+'px'});
			$('#header-area').css({"padding-left": 260+'px'});
			$('#main-content').css({"padding-left": 260 + 'px'});
		} else{
			$('.sidenav').css({"width": 60+'px'});
			$('.resize-menu .fa-long-arrow-alt-left').addClass('fa-long-arrow-alt-right').removeClass('fa-long-arrow-alt-left');
			$(this).addClass('left');
			$('#header-area').css({"padding-left": 60+'px'});
			$('#main-content').css({"padding-left": 60 + 'px'});
		}
	});

	//keo tha list menu
	$('.sidenav .list-content>ul>li>ul').slideUp();
	$('.sidenav .list-content>ul>li>a').click(function(event) {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).next().slideToggle();
		} else{	
			$('.sidenav .list-content>ul>li>a.active').next().slideUp();
			$('.sidenav .list-content>ul>li>a.active').removeClass('active');
			$(this).next().slideToggle();
			$(this).toggleClass('active');
		}

		if ($('.resize-menu').hasClass('left')) {
			$('.resize-menu .fa-long-arrow-alt-right').addClass('fa-long-arrow-alt-left').removeClass('fa-long-arrow-alt-right');
			$('.resize-menu').removeClass('left');
			$('.sidenav').css({"width": 260+'px'});
			$('#header-area').css({"padding-left": 260+'px'});

			$('.sidenav .list-content>ul>li a span').toggleClass('d-none');
			$('.sidenav .list-content>ul>li>a i.fa-angle-right').toggleClass('d-none');
			$('.sidenav .list-content>ul>li>ul').toggleClass('d-none');
			$('.sidenav header .name-header').toggleClass('d-none');
		}
	});
	
	//code cho phan nut filter
	$('#room-map .group-control .btn-filter li button').click(function(event) {
		var danhmuc = $(this).data('room');
		danhmuc = "."+danhmuc;

		if ($(this).hasClass('room-all')) {
			$('#room-map .list-room').isotope({filter:'*'});
		} else{
			$('#room-map .list-room').isotope({filter:danhmuc});
		}

		return false;
	});

	//code thẻ select filter
	$('#select-filter-status').change(function(event) {
		var danhmuc = $('#select-filter-status').val();
		danhmuc = "."+danhmuc;

		if (danhmuc=='.room-all') {
			$('#room-map .list-room').isotope({filter:'*'});
		} else{
			$('#room-map .list-room').isotope({filter:danhmuc});
		}
	});
	//code thẻ select thông tin chung
	$('#general-information #select-list-information').change(function(event) {
		var danhmuc = $('#select-list-information').val();
		danhmuc = "."+danhmuc;

		$('#general-information .list-information .list-room').isotope({filter:danhmuc});

	});

	//code nút hiện thị phòng gọn gàn
	$('.btn-room-tidy').click(function(event) {
		$('#room-map .list-room .room-item').removeClass('col-12 col-md-6 col-lg-3');
		$('#room-map .list-room .room-item').addClass('col-6 col-md-2 col-lg-1');
		$('#room-map .list-room .room-item .number-order').css({'width': 100+'%'});
		$('#room-map .list-room .room-item .room-status').addClass('d-none');
		$('#room-map .list-room').isotope({filter:'*'});
		return false;
	});

	//code nút hiện thị phòng chi tiết
	$('.btn-room-detail').click(function(event) {
		$('#room-map .list-room .room-item').addClass('col-12 col-md-6 col-lg-3');
		$('#room-map .list-room .room-item').removeClass('col-6 col-md-2 col-lg-1');
		$('#room-map .list-room .room-item .number-order').css({'width': 35+'%'});
		$('#room-map .list-room .room-item .room-status').removeClass('d-none');
		$('#room-map .list-room').isotope({filter:'*'});
		return false;
	});

});