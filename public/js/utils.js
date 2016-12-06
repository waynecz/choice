$(function () {
	var starrySky      = document.getElementById('starrySky'),
		timer_img      = null,
		isLoad         = true,
		menuHamberger  = $('#hamberger'),
		menuList       = $('.nav__list'),
		bodyHeight     = $(window).innerHeight(),
		bodyWidth      = $(window).width(),
		isMob          = (bodyWidth <= 740),
		clickEventname = isMob ? 'tap' : 'click',
		navBox         = $('.nav-box'),
		page           = $('#page').data('page');

	var simboss = {
		isImgLoad: function (callback) {
			if (starrySky.height === 0) {
				isLoad = false;
				return false;
			}
			if (isLoad) {
				clearTimeout(timer_img);
				callback();
			} else {
				isLoad    = true;
				timer_img = setTimeout(function () {
					simboss.isImgLoad(callback);
				}, 300);
			}
		},
		toggleMenu: function () {
			$(this).find('.nav__menu-dot').toggleClass('open')
				.parent().siblings('.nav__list').toggleClass('open')
		},
		init: function () {
			// 移动端兼容
			if (bodyWidth <= 740) {
				$('.service__service-icon').css('zoom', bodyWidth / (12 * 70));
				$('.customers__customer-logo').css('zoom', bodyWidth / (4 * 200));
				$('.feature__icon').css('zoom', bodyWidth / (12 * 65));
				if ($('.platform').length) $('.platform').attr('data-aos', null);
				if ($('.service').length) $('.service').attr('data-aos', null);
				$('.nav-box').attr('data-aos', null);
				$('.nav__unit, .nav__logo-box').attr('data-aos', null);
				// 产品页title改变
				if (page === 'production') {
					$('.header__banner-box').addClass('production');
					$('#pageTitle').text('产品介绍')
				} else {
					$('.header').css('height', bodyHeight + 'px');
				}
				// 首页星空动画
				if (page === 'index') {
					$(starrySky).attr('src', $(starrySky).data('mob-src')).addClass('animate');
				}
			}
			// 进场动画
			if (starrySky) {
				simboss.isImgLoad(function () {
					setTimeout(function () {
						AOS.init()
					}, 0)
				});
			} else {
				AOS.init()
			}


		},
		throttle: function (fn, delay, immediate, debounce) {
			var curr      = +new Date(),//当前事件
				last_call = 0,
				last_exec = 0,
				timer     = null,
				diff, //时间差
				context,//上下文
				args,
				exec      = function () {
					last_exec = curr;
					fn.apply(context, args);
				};
			return function () {
				curr = +new Date();
				context = this,
					args = arguments,
					diff = curr - (debounce ? last_call : last_exec) - delay;
				clearTimeout(timer);
				if (debounce) {
					if (immediate) {
						timer = setTimeout(exec, delay);
					} else if (diff >= 0) {
						exec();
					}
				} else {
					if (diff >= 0) {
						exec();
					} else if (immediate) {
						timer = setTimeout(exec, -diff);
					}
				}
				last_call = curr;
			}
		},
		handleScroll: function () {
			var st = $(window).scrollTop();
			if (st > 200) {
				navBox.removeClass('active')
			} else {
				navBox.addClass('active')
			}
		}
	};


	// 入场动画
	simboss.init();

	// 移动端事件绑定
	if (bodyWidth <= 740) {
		// 出现菜单
		menuHamberger.on(clickEventname, function (e) {
			e = e || window.event;
			e.stopPropagation();
			simboss.toggleMenu.call(this);
		});
		// 空白处关闭菜单
		$(document).on(clickEventname, function (e) {
			e = e || window.event;
			e.stopPropagation();
			if (menuList.is(':visible') && !menuHamberger.is(e.target) && menuHamberger.has(e.target).length === 0) {
				menuHamberger.trigger(clickEventname)
			}
		});
		// 导航栏变色不同页面区别
		if (page === 'index' || page === 'production') {
			$(window).on('scroll', simboss.throttle(simboss.handleScroll, 50, true))
		} else {
			navBox.removeClass('active');
		}
		// drop-down按钮点击下滑
		if ($('.header__drop-down').length) {
			$('.header__drop-down').on(clickEventname, function () {
				$('html, body').animate({'scrollTop': bodyHeight - (2 * bodyWidth / 25)}, 500)
			})
		}
	}
});