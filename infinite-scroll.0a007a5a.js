function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},r.parcelRequired7c6=a);var i=a("iQIUW"),s=a("dSs1Y"),l=a("fZKcF"),o=a("iGUrG"),u=a("kP3O0"),d=a("h5xPl");"dark"===localStorage.getItem("them")&&(0,u.handlerDark)();let c=null,f=null;const g=new(e(l))(".gallery a");o.elements.form.addEventListener("submit",(function(e){if(e.preventDefault(),o.elements.guard.classList.add("visually-hidden"),o.elements.box.innerHTML="",f=null,c=1,f=e.currentTarget.elements.searchQuery.value.trim().split(" ").filter((e=>""!==e)).join("+").toLowerCase(),e.currentTarget.elements.searchQuery.value=f.split("+").join(" "),""===f)return i.Notify.warning("We can't find this, because you haven't entered anything. Please try again.");(0,d.serviceImgs)(f,c).then((({data:{totalHits:e,hits:r}})=>{if(0===e)return i.Notify.failure("Sorry, there are no images matching your search query. Please try again.");i.Notify.success(`Hooray! We found ${e} images.`),(0,u.createMarkup)(r),g.refresh(),o.elements.guard.classList.remove("visually-hidden"),c<e/d.perPage?m.observe(o.elements.guard):h.observe(o.elements.guard)})).catch((e=>i.Notify.failure(e.message))).finally((()=>s.Loading.remove()))})),o.elements.lightThemBtn.addEventListener("click",u.handlerLight),o.elements.darkThemBtn.addEventListener("click",u.handlerDark);const h=new IntersectionObserver((function(e){e.forEach((e=>{e.isIntersecting&&(i.Notify.warning("We're sorry, but you've reached the end of search results."),h.unobserve(o.elements.guard))}))}),{rootMargin:"10px"}),m=new IntersectionObserver((function(e){e.forEach((e=>{e.isIntersecting&&(c++,(0,d.serviceImgs)(f,c).then((({data:{totalHits:e,hits:r}})=>{(0,u.createMarkup)(r),g.refresh(),c>=e/d.perPage&&(h.observe(o.elements.guard),m.unobserve(o.elements.guard))})).catch((e=>i.Notify.failure(e.message))).finally((()=>s.Loading.remove())))}))}),{rootMargin:"500px"});
//# sourceMappingURL=infinite-scroll.0a007a5a.js.map
