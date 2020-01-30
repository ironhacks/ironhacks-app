/**
 * @popperjs/core v2.0.4 - MIT License
 */

!function(e, t) {
'object'==typeof exports&&'undefined'!=typeof module?t(exports):'function'==typeof define&&define.amd?define(['exports'], t):t((e=e||self).Popper={});
}(this, (function(e) {
  function t(e) {
    return {width: (e=e.getBoundingClientRect()).width, height: e.height, top: e.top, right: e.right, bottom: e.bottom, left: e.left, x: e.left, y: e.top};
  } function n(e) {
    return '[object Window]'!=={}.toString.call(e)?(e=e.ownerDocument)?e.defaultView:window:e;
  } function r(e) {
    return {scrollLeft: (e=n(e)).pageXOffset, scrollTop: e.pageYOffset};
  } function o(e) {
    return e instanceof n(e).Element;
  } function i(e) {
    return e instanceof n(e).HTMLElement;
  } function a(e) {
    return e?(e.nodeName||'').toLowerCase():null;
  } function s(e, o, s) {
    void 0===s&&(s=!1), e=t(e); let f={scrollLeft: 0, scrollTop: 0}; let p={x: 0, y: 0}; return s||('body'!==a(o)&&(f=o!==n(o)&&i(o)?{scrollLeft: o.scrollLeft, scrollTop: o.scrollTop}:r(o)), i(o)&&((p=t(o)).x+=o.clientLeft, p.y+=o.clientTop)), {x: e.left+f.scrollLeft-p.x, y: e.top+f.scrollTop-p.y, width: e.width, height: e.height};
  } function f(e) {
    return {x: e.offsetLeft, y: e.offsetTop, width: e.offsetWidth, height: e.offsetHeight};
  } function p(e) {
    return 'html'===a(e)?e:e.parentNode||e.host||document.ownerDocument||document.documentElement;
  } function c(e) {
    return n(e).getComputedStyle(e);
  } function u(e, t) {
    void 0===t&&(t=[]); let r=function e(t) {
      if (0<=['html', 'body', '#document'].indexOf(a(t))) return t.ownerDocument.body; if (i(t)) {
        const n=c(t); if (/auto|scroll|overlay|hidden/.test(n.overflow+n.overflowY+n.overflowX)) return t;
      } return e(p(t));
    }(e); return r=(e='body'===a(r))?n(r):r, t=t.concat(r), e?t:t.concat(u(p(r)));
  } function d(e) {
    let t; return !i(e)||!(t=e.offsetParent)||void 0!==window.InstallTrigger&&'fixed'===c(t).position?null:t;
  } function l(e) {
    const t=n(e); for (e=d(e); e&&0<=['table', 'td', 'th'].indexOf(a(e));)e=d(e); return e&&'body'===a(e)&&'static'===c(e).position?t:e||t;
  } function m(e) {
    const t=new Map(); const n=new Set(); const r=[]; return e.forEach((function(e) {
      t.set(e.name, e);
    })), e.forEach((function(e) {
      n.has(e.name)||function e(o) {
        n.add(o.name), [].concat(o.requires||[], o.requiresIfExists||[]).forEach((function(r) {
          n.has(r)||(r=t.get(r))&&e(r);
        })), r.push(o);
      }(e);
    })), r;
  } function h(e) {
    let t; return function() {
      return t||(t=new Promise((function(n) {
        Promise.resolve().then((function() {
          t=void 0, n(e());
        }));
      }))), t;
    };
  } function v(e) {
    return e.split('-')[0];
  } function g() {
    for (var e=arguments.length, t=Array(e), n=0; n<e; n++)t[n]=arguments[n]; return !t.some((function(e) {
      return !(e&&'function'==typeof e.getBoundingClientRect);
    }));
  } function b(e) {
    void 0===e&&(e={}); const t=e.defaultModifiers; const n=void 0===t?[]:t; const r=void 0===(e=e.defaultOptions)?H:e; return function(e, t, i) {
      function a() {
        c.forEach((function(e) {
          return e();
        })), c=[];
      } void 0===i&&(i=r); let p={placement: 'bottom', orderedModifiers: [], options: Object.assign({}, H, {}, r), modifiersData: {}, elements: {reference: e, popper: t}, attributes: {}, styles: {}}; var c=[]; let d=!1; var v={state: p, setOptions: function(i) {
        return a(), p.options=Object.assign({}, r, {}, p.options, {}, i), p.scrollParents={reference: o(e)?u(e):[], popper: u(t)}, i=function(e) {
          const t=m(e); return A.reduce((function(e, n) {
            return e.concat(t.filter((function(e) {
              return e.phase===n;
            })));
          }), []);
        }([].concat(p.options.modifiers.filter((function(e) {
          return !n.find((function(t) {
            return t.name===e.name;
          }));
        })), n.map((function(e) {
          return Object.assign({}, e, {}, p.options.modifiers.find((function(t) {
            return t.name===e.name;
          })));
        })))), p.orderedModifiers=i.filter((function(e) {
          return e.enabled;
        })), p.orderedModifiers.forEach((function(e) {
          let t=e.name; let n=e.options; n=void 0===n?{}:n, 'function'==typeof(e=e.effect)&&(t=e({state: p, name: t, instance: v, options: n}), c.push(t||function() {}));
        })), v.update();
      }, forceUpdate: function() {
        if (!d) {
          let e=p.elements; let t=e.reference; if (g(t, e=e.popper)) {
            for (p.rects={reference: s(t, l(e), 'fixed'===p.options.strategy), popper: f(e)}, p.reset=!1, p.placement=p.options.placement, p.orderedModifiers.forEach((function(e) {
              return p.modifiersData[e.name]=Object.assign({}, e.data);
            })), t=0; t<p.orderedModifiers.length; t++) {
              if (!0===p.reset)p.reset=!1, t=-1; else {
                let n=p.orderedModifiers[t]; e=n.fn; let r=n.options; r=void 0===r?{}:r, n=n.name, 'function'==typeof e&&(p=e({state: p, options: r, name: n, instance: v})||p);
              }
            }
          }
        }
      }, update: h((function() {
        return new Promise((function(e) {
          v.forceUpdate(), e(p);
        }));
      })), destroy: function() {
        a(), d=!0;
      }}; return g(e, t)?(v.setOptions(i).then((function(e) {
        !d&&i.onFirstUpdate&&i.onFirstUpdate(e);
      })), v):v;
    };
  } function y(e) {
    return 0<=['top', 'bottom'].indexOf(e)?'x':'y';
  } function x(e) {
    const t=e.reference; const n=e.element; let r=(e=e.placement)?v(e):null; e=e?e.split('-')[1]:null; let o=t.x+t.width/2-n.width/2; let i=t.y+t.height/2-n.height/2; switch (r) {
      case 'top': o={x: o, y: t.y-n.height}; break; case 'bottom': o={x: o, y: t.y+t.height}; break; case 'right': o={x: t.x+t.width, y: i}; break; case 'left': o={x: t.x-n.width, y: i}; break; default: o={x: t.x, y: t.y};
    } if (null!=(r=r?y(r):null)) {
      switch (i='y'===r?'height':'width', e) {
        case 'start': o[r]=Math.floor(o[r])-Math.floor(t[i]/2-n[i]/2); break; case 'end': o[r]=Math.floor(o[r])+Math.ceil(t[i]/2-n[i]/2);
      }
    } return o;
  } function w(e) {
    let t; let r=e.popper; const o=e.popperRect; const i=e.placement; let a=e.offsets; const s=e.position; const f=e.gpuAcceleration; const p=e.adaptive; let c=window.devicePixelRatio||1; e=Math.round(a.x*c)/c||0, c=Math.round(a.y*c)/c||0; const u=a.hasOwnProperty('x'); a=a.hasOwnProperty('y'); let d; let m='left'; let h='top'; if (p) {
      let v=l(r); v===n(r)&&(v=r.ownerDocument.documentElement), 'top'===i&&(h='bottom', c-=v.clientHeight-o.height, c*=f?1:-1), 'left'===i&&(m='right', e-=v.clientWidth-o.width, e*=f?1:-1);
    } return r=Object.assign({position: s}, p&&F), f?Object.assign({}, r, ((d={})[h]=a?'0':'', d[m]=u?'0':'', d.transform=2>(window.devicePixelRatio||1)?'translate('+e+'px, '+c+'px)':'translate3d('+e+'px, '+c+'px, 0)', d)):Object.assign({}, r, ((t={})[h]=a?c+'px':'', t[m]=u?e+'px':'', t.transform='', t));
  } function O(e) {
    return e.replace(/left|right|bottom|top/g, (function(e) {
      return I[e];
    }));
  } function M(e) {
    return e.replace(/start|end/g, (function(e) {
      return N[e];
    }));
  } function D(e, t) {
    const n=!(!t.getRootNode||!t.getRootNode().host); if (e.contains(t)) return !0; if (n) {
      do {
        if (t&&e.isSameNode(t)) return !0; t=t.parentNode||t.host;
      } while (t);
    } return !1;
  } function j(e) {
    return Object.assign({}, e, {left: e.x, top: e.y, right: e.x+e.width, bottom: e.y+e.height});
  } function E(e, o) {
    if ('viewport'===o)e=j({width: (e=n(e)).innerWidth, height: e.innerHeight, x: 0, y: 0}); else if (i(o))e=t(o); else {
      let a=e.ownerDocument.documentElement; e=n(a), o=r(a), (a=s(a.ownerDocument.documentElement, e)).height=Math.max(a.height, e.innerHeight), a.width=Math.max(a.width, e.innerWidth), a.x=-o.scrollLeft, a.y=-o.scrollTop, e=j(a);
    } return e;
  } function k(e, t, r) {
    return t='clippingParents'===t?function(e) {
      const t=u(e); const n=0<=['absolute', 'fixed'].indexOf(c(e).position)&&i(e)?l(e):e; return o(n)?t.filter((function(e) {
        return o(e)&&D(e, n);
      })):[];
    }(e):[].concat(t), (r=(r=[].concat(t, [r])).reduce((function(t, r) {
      const o=E(e, r); let s=n(r=i(r)?r:e.ownerDocument.documentElement); let f=i(r)?c(r):{}; parseFloat(f.borderTopWidth); let p=parseFloat(f.borderRightWidth)||0; let u=parseFloat(f.borderBottomWidth)||0; const d=parseFloat(f.borderLeftWidth)||0; f='html'===a(r); const l=r.clientWidth+p; const m=r.clientHeight+u; return u=r.clientTop, p=r.clientLeft>d?p:f?s.innerWidth-l:r.offsetWidth-l, s=f?s.innerHeight-m:r.offsetHeight-m, r=r.clientLeft, t.top=Math.max(o.top+u, t.top), t.right=Math.min(o.right-p, t.right), t.bottom=Math.min(o.bottom-s, t.bottom), t.left=Math.max(o.left+r, t.left), t;
    }), E(e, r[0]))).width=r.right-r.left, r.height=r.bottom-r.top, r.x=r.left, r.y=r.top, r;
  } function P(e) {
    return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, {}, e);
  } function L(e, t) {
    return t.reduce((function(t, n) {
      return t[n]=e, t;
    }), {});
  } function W(e, n) {
    void 0===n&&(n={}); let r=n; n=void 0===(n=r.placement)?e.placement:n; let i=r.boundary; let a=void 0===i?'clippingParents':i; let s=void 0===(i=r.rootBoundary)?'viewport':i; i=void 0===(i=r.elementContext)?'popper':i; let f=r.altBoundary; let p=void 0!==f&&f; r=P('number'!=typeof(r=void 0===(r=r.padding)?0:r)?r:L(r, T)); const c=e.elements.reference; f=e.rects.popper, a=k(o(p=e.elements[p?'popper'===i?'reference':'popper':i])?p:e.elements.popper.ownerDocument.documentElement, a, s), p=x({reference: s=t(c), element: f, strategy: 'absolute', placement: n}), f=j(Object.assign({}, f, {}, p)), s='popper'===i?f:s; const u={top: a.top-s.top+r.top, bottom: s.bottom-a.bottom+r.bottom, left: a.left-s.left+r.left, right: s.right-a.right+r.right}; if (e=e.modifiersData.offset, 'popper'===i&&e) {
      const d=e[n]; Object.keys(u).forEach((function(e) {
        const t=0<=['right', 'bottom'].indexOf(e)?1:-1; const n=0<=['top', 'bottom'].indexOf(e)?'y':'x'; u[e]+=d[n]*t;
      }));
    } return u;
  } function B(e, t, n) {
    return void 0===n&&(n={x: 0, y: 0}), {top: e.top-t.height-n.y, right: e.right-t.width+n.x, bottom: e.bottom-t.height+n.y, left: e.left-t.width-n.x};
  } function R(e) {
    return ['top', 'right', 'bottom', 'left'].some((function(t) {
      return 0<=e[t];
    }));
  } var T=['top', 'bottom', 'right', 'left']; const q=T.reduce((function(e, t) {
    return e.concat([t+'-start', t+'-end']);
  }), []); const S=[].concat(T, ['auto']).reduce((function(e, t) {
    return e.concat([t, t+'-start', t+'-end']);
  }), []); var A='beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite'.split(' '); var H={placement: 'bottom', modifiers: [], strategy: 'absolute'}; const C={passive: !0}; var F={top: 'auto', right: 'auto', bottom: 'auto', left: 'auto'}; var I={left: 'right', right: 'left', bottom: 'top', top: 'bottom'}; var N={start: 'end', end: 'start'}; const _=[{name: 'eventListeners', enabled: !0, phase: 'write', fn: function() {}, effect: function(e) {
    const t=e.state; const r=e.instance; const o=(e=e.options).scroll; const i=void 0===o||o; const a=void 0===(e=e.resize)||e; const s=n(t.elements.popper); const f=[].concat(t.scrollParents.reference, t.scrollParents.popper); return i&&f.forEach((function(e) {
      e.addEventListener('scroll', r.update, C);
    })), a&&s.addEventListener('resize', r.update, C), function() {
      i&&f.forEach((function(e) {
        e.removeEventListener('scroll', r.update, C);
      })), a&&s.removeEventListener('resize', r.update, C);
    };
  }, data: {}}, {name: 'popperOffsets', enabled: !0, phase: 'read', fn: function(e) {
    const t=e.state; t.modifiersData[e.name]=x({reference: t.rects.reference, element: t.rects.popper, strategy: 'absolute', placement: t.placement});
  }, data: {}}, {name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: function(e) {
    const t=e.state; let n=e.options; e=void 0===(e=n.gpuAcceleration)||e, n=void 0===(n=n.adaptive)||n, e={placement: v(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: e}, t.styles.popper=Object.assign({}, t.styles.popper, {}, w(Object.assign({}, e, {offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: n}))), null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({}, t.styles.arrow, {}, w(Object.assign({}, e, {offsets: t.modifiersData.arrow, position: 'absolute', adaptive: !1})))), t.attributes.popper=Object.assign({}, t.attributes.popper, {'data-popper-placement': t.placement});
  }, data: {}}, {name: 'applyStyles', enabled: !0, phase: 'write', fn: function(e) {
    const t=e.state; Object.keys(t.elements).forEach((function(e) {
      const n=t.styles[e]||{}; const r=t.attributes[e]||{}; const o=t.elements[e]; i(o)&&a(o)&&(Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
        const t=r[e]; !1===t?o.removeAttribute(e):o.setAttribute(e, !0===t?'':t);
      })));
    }));
  }, effect: function(e) {
    const t=e.state; const n={position: 'absolute', left: '0', top: '0', margin: '0'}; return Object.assign(t.elements.popper.style, n), function() {
      Object.keys(t.elements).forEach((function(e) {
        const r=t.elements[e]; let o=Object.keys(t.styles.hasOwnProperty(e)?Object.assign({}, t.styles[e]):n); e=t.attributes[e]||{}, o=o.reduce((function(e, t) {
          let n; return Object.assign({}, e, ((n={})[String(t)]='', n));
        }), {}), i(r)&&a(r)&&(Object.assign(r.style, o), Object.keys(e).forEach((function(e) {
          return r.removeAttribute(e);
        })));
      }));
    };
  }, requires: ['computeStyles']}, {name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: function(e) {
    const t=e.state; const n=e.name; const r=void 0===(e=e.options.offset)?[0, 0]:e; const o=(e=S.reduce((function(e, n) {
      let o=t.rects; let i=v(n); const a=0<=['left', 'top'].indexOf(i)?-1:1; let s='function'==typeof r?r(Object.assign({}, o, {placement: n})):r; return o=(o=s[0])||0, s=((s=s[1])||0)*a, i=0<=['left', 'right'].indexOf(i)?{x: s, y: o}:{x: o, y: s}, e[n]=i, e;
    }), {}))[t.placement]; const i=o.y; t.modifiersData.popperOffsets.x+=o.x, t.modifiersData.popperOffsets.y+=i, t.modifiersData[n]=e;
  }}, {name: 'flip', enabled: !0, phase: 'main', fn: function(e) {
    const t=e.state; let n=e.options; if (e=e.name, !t.modifiersData[e]._skip) {
      let r=n.fallbackPlacements; const o=n.padding; const i=n.boundary; const a=n.rootBoundary; const s=void 0===(n=n.flipVariations)||n; let f=v(n=t.options.placement); r=r||(f!==n&&s?function(e) {
        if ('auto'===v(e)) return []; const t=O(e); return [M(e), t, M(t)];
      }(n):[O(n)]); const p=function(e, t) {
        const n=new Set(); return e.filter((function(e) {
          if (e=t(e), !n.has(e)) return n.add(e), !0;
        }));
      }([n].concat(r).reduce((function(e, n) {
        return 'auto'===v(n)?e.concat(function(e, t) {
          void 0===t&&(t={}); const n=t.boundary; const r=t.rootBoundary; const o=t.padding; const i=t.flipVariations; const a=t.placement.split('-')[1]; const s=(a?i?q:q.filter((function(e) {
            return e.split('-')[1]===a;
          })):T).reduce((function(t, i) {
            return t[i]=W(e, {placement: i, boundary: n, rootBoundary: r, padding: o})[v(i)], t;
          }), {}); return Object.keys(s).sort((function(e, t) {
            return s[e]-s[t];
          }));
        }(t, {placement: n, boundary: i, rootBoundary: a, padding: o, flipVariations: s})):e.concat(n);
      }), []), (function(e) {
        return e;
      })); r=t.rects.reference, n=t.rects.popper; const c=new Map(); f=!0; for (var u=p[0], d=0; d<p.length; d++) {
        const l=p[d]; let m=v(l); let h='start'===l.split('-')[1]; const g=0<=['top', 'bottom'].indexOf(m); let b=g?'width':'height'; const y=W(t, {placement: l, boundary: i, rootBoundary: a, padding: o}); if (h=g?h?'right':'left':h?'bottom':'top', r[b]>n[b]&&(h=O(h)), b=O(h), (m=[0>=y[m], 0>=y[h], 0>=y[b]]).every((function(e) {
          return e;
        }))) {
          u=l, f=!1; break;
        }c.set(l, m);
      } if (f) {
        for (r=function(e) {
          const t=p.find((function(t) {
            if (t=c.get(t)) {
              return t.slice(0, e).every((function(e) {
                return e;
              }));
            }
          })); if (t) return u=t, 'break';
        }, n=s?3:1; 0<n&&'break'!==r(n); n--);
      }t.placement!==u&&(t.modifiersData[e]._skip=!0, t.placement=u, t.reset=!0);
    }
  }, requiresIfExists: ['offset'], data: {_skip: !1}}, {name: 'preventOverflow', enabled: !0, phase: 'main', fn: function(e) {
    const t=e.state; let n=e.options; e=e.name; let r=n.mainAxis; let o=void 0===r||r; r=void 0!==(r=n.altAxis)&&r; let i=n.tether; i=void 0===i||i; let a=n.tetherOffset; let s=void 0===a?0:a; n=W(t, {boundary: n.boundary, rootBoundary: n.rootBoundary, padding: n.padding}), a=v(t.placement); let p=t.placement.split('-')[1]; let c=!p; const u=y(a); a='x'===u?'y':'x'; const d=t.modifiersData.popperOffsets; const l=t.rects.reference; let m=t.rects.popper; const h='function'==typeof s?s(Object.assign({}, t.rects, {placement: t.placement})):s; if (s={x: 0, y: 0}, o) {
      let g='y'===u?'top':'left'; let b='y'===u?'bottom':'right'; const x='y'===u?'height':'width'; o=d[u]; const w=d[u]+n[g]; const O=d[u]-n[b]; const M=i?-m[x]/2:0; let D='start'===p?l[x]:m[x]; p='start'===p?-m[x]:-l[x], m=t.elements.arrow, m=i&&m?f(m):{width: 0, height: 0}; let j=t.modifiersData['arrow#persistent']?t.modifiersData['arrow#persistent'].padding:{top: 0, right: 0, bottom: 0, left: 0}; g=j[g], b=j[b], m=Math.max(0, Math.min(Math.abs(l[x]-m[x]), m[x])), j=t.modifiersData.offset?t.modifiersData.offset[t.placement][u]:0, D=t.modifiersData.popperOffsets[u]+(c?l[x]/2-M-m-g-h:D-m-g-h)-j, c=t.modifiersData.popperOffsets[u]+(c?-l[x]/2+M+m+b+h:p+m+b+h)-j, i=Math.max(i?Math.min(w, D):w, Math.min(o, i?Math.max(O, c):O)), t.modifiersData.popperOffsets[u]=i, s[u]=i-o;
    }r&&(r=d[a], i=Math.max(r+n['x'===u?'top':'left'], Math.min(r, r-n['x'===u?'bottom':'right'])), t.modifiersData.popperOffsets[a]=i, s[a]=i-r), t.modifiersData[e]=s;
  }, requiresIfExists: ['offset']}, {name: 'arrow', enabled: !0, phase: 'main', fn: function(e) {
    let t; const n=e.state; e=e.name; let r=n.elements.arrow; let o=n.modifiersData.popperOffsets; let i=v(n.placement); const a=y(i); if (i=0<=['left', 'right'].indexOf(i)?'height':'width', r) {
      const s=n.modifiersData[e+'#persistent'].padding; r=f(r), o=Math.max(s['y'===a?'top':'left'], Math.min(n.rects.popper[i]/2-r[i]/2+((n.rects.reference[i]+n.rects.reference[a]-o[a]-n.rects.popper[i])/2-(o[a]-n.rects.reference[a])/2), n.rects.popper[i]-r[i]-s['y'===a?'bottom':'right'])), n.modifiersData[e]=((t={})[a]=o, t);
    }
  }, effect: function(e) {
    const t=e.state; let n=e.options; e=e.name; let r=n.element; r=void 0===r?'[data-popper-arrow]':r, n=void 0===(n=n.padding)?0:n, ('string'!=typeof r||(r=t.elements.popper.querySelector(r)))&&D(t.elements.popper, r)&&(t.elements.arrow=r, t.modifiersData[e+'#persistent']={padding: P('number'!=typeof n?n:L(n, T))});
  }, requires: ['popperOffsets'], requiresIfExists: ['preventOverflow']}, {name: 'hide', enabled: !0, phase: 'main', requiresIfExists: ['preventOverflow'], fn: function(e) {
    const t=e.state; e=e.name; let n=t.rects.reference; let r=t.rects.popper; let o=t.modifiersData.preventOverflow; const i=W(t, {elementContext: 'reference'}); let a=W(t, {altBoundary: !0}); n=B(i, n), r=B(a, r, o), o=R(n), a=R(r), t.modifiersData[e]={referenceClippingOffsets: n, popperEscapeOffsets: r, isReferenceHidden: o, hasPopperEscaped: a}, t.attributes.popper=Object.assign({}, t.attributes.popper, {'data-popper-reference-hidden': o, 'data-popper-escaped': a});
  }}]; const U=b({defaultModifiers: _}); e.createPopper=U, e.defaultModifiers=_, e.popperGenerator=b, Object.defineProperty(e, '__esModule', {value: !0});
}));
// # sourceMappingURL=popper.min.js.map
