"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[4171],{64171:(e,t,s)=>{s.r(t),s.d(t,{LogLevelSwitcher:()=>b,default:()=>y});var o=s(52657),l=s(13815),n=s(18330),a=s(2182),r=s(38036),i=s(89224),d=s(90626),c=s(92541),g=s(75550),h=s(74547),u=s(62471),m=s.n(u),_=s(58646);function C(e){const t=(e.translator||c.nullTranslator).load("jupyterlab");let s="";return e.newMessages>0?s=t.__("%1 new messages, %2 log entries for %3",e.newMessages,e.logEntries,e.source):s+=t.__("%1 log entries for %2",e.logEntries,e.source),m().createElement(d.GroupItem,{spacing:0,onClick:e.handleClick,title:s},m().createElement(g.listIcon.react,{top:"2px",stylesheet:"statusBar"}),e.newMessages>0?m().createElement(d.TextItem,{source:e.newMessages}):m().createElement(m().Fragment,null))}class p extends l.VDomRenderer{constructor(e){super(new p.Model(e.loggerRegistry)),this.translator=e.translator||c.nullTranslator,this._handleClick=e.handleClick,this.addClass(d.interactiveItem),this.addClass("jp-LogConsoleStatusItem")}render(){if(null===this.model||0===this.model.version)return null;const{flashEnabled:e,messages:t,source:s,version:o,versionDisplayed:l,versionNotified:n}=this.model;return null!==s&&e&&o>n?(this._flashHighlight(),this.model.sourceNotified(s,o)):null!==s&&e&&o>l?this._showHighlighted():this._clearHighlight(),m().createElement(C,{handleClick:this._handleClick,logEntries:t,newMessages:o-l,source:this.model.source,translator:this.translator})}_flashHighlight(){this._showHighlighted(),this.removeClass("jp-LogConsole-flash"),requestAnimationFrame((()=>{this.addClass("jp-LogConsole-flash")}))}_showHighlighted(){this.addClass("jp-mod-selected")}_clearHighlight(){this.removeClass("jp-LogConsole-flash"),this.removeClass("jp-mod-selected")}}!function(e){class t extends l.VDomModel{constructor(e){super(),this.flashEnabledChanged=new _.Signal(this),this._flashEnabled=!0,this._source=null,this._sourceVersion=new Map,this._loggerRegistry=e,this._loggerRegistry.registryChanged.connect(this._handleLogRegistryChange,this),this._handleLogRegistryChange()}get messages(){return null===this._source?0:this._loggerRegistry.getLogger(this._source).length}get version(){return null===this._source?0:this._loggerRegistry.getLogger(this._source).version}get source(){return this._source}set source(e){this._source!==e&&(this._source=e,this.stateChanged.emit())}get versionDisplayed(){var e,t;return null===this._source?0:null!==(t=null===(e=this._sourceVersion.get(this._source))||void 0===e?void 0:e.lastDisplayed)&&void 0!==t?t:0}get versionNotified(){var e,t;return null===this._source?0:null!==(t=null===(e=this._sourceVersion.get(this._source))||void 0===e?void 0:e.lastNotified)&&void 0!==t?t:0}get flashEnabled(){return this._flashEnabled}set flashEnabled(e){this._flashEnabled!==e&&(this._flashEnabled=e,this.flashEnabledChanged.emit(),this.stateChanged.emit())}sourceDisplayed(e,t){if(null===e||null===t)return;const s=this._sourceVersion.get(e);let o=!1;s.lastDisplayed<t&&(s.lastDisplayed=t,o=!0),s.lastNotified<t&&(s.lastNotified=t,o=!0),o&&e===this._source&&this.stateChanged.emit()}sourceNotified(e,t){if(null===e)return;const s=this._sourceVersion.get(e);s.lastNotified<t&&(s.lastNotified=t,e===this._source&&this.stateChanged.emit())}_handleLogRegistryChange(){const e=this._loggerRegistry.getLoggers();for(const t of e)this._sourceVersion.has(t.source)||(t.contentChanged.connect(this._handleLogContentChange,this),this._sourceVersion.set(t.source,{lastDisplayed:0,lastNotified:0}))}_handleLogContentChange({source:e},t){e===this._source&&this.stateChanged.emit()}}e.Model=t}(p||(p={}));const v="@jupyterlab/logconsole-extension:plugin";var f;!function(e){e.addCheckpoint="logconsole:add-checkpoint",e.clear="logconsole:clear",e.open="logconsole:open",e.setLevel="logconsole:set-level"}(f||(f={}));const L={activate:function(e,t,s,o,a,r,i,d,c){const h=a.load("jupyterlab");let u=null,m=null;const _=new n.LoggerRegistry({defaultRendermime:s,maxLength:1e3}),C=new l.WidgetTracker({namespace:"logconsole"});i&&i.restore(C,{command:f.open,name:()=>"logconsole"});const L=new p({loggerRegistry:_,handleClick:()=>{var t;u?e.shell.activateById(u.id):y({insertMode:"split-bottom",ref:null===(t=e.shell.currentWidget)||void 0===t?void 0:t.id})},translator:a}),y=(t={})=>{m=new n.LogConsolePanel(_,a),m.source=void 0!==t.source?t.source:o.currentWidget?o.currentWidget.context.path:null,u=new l.MainAreaWidget({content:m}),u.addClass("jp-LogConsole"),u.title.closable=!0,u.title.icon=g.listIcon,u.title.label=h.__("Log Console");const s=new l.CommandToolbarButton({commands:e.commands,id:f.addCheckpoint}),r=new l.CommandToolbarButton({commands:e.commands,id:f.clear});u.toolbar.addItem("lab-log-console-add-checkpoint",s),u.toolbar.addItem("lab-log-console-clear",r),u.toolbar.addItem("level",new b(u.content,a)),m.sourceChanged.connect((()=>{e.commands.notifyCommandChanged()})),m.sourceDisplayed.connect(((e,{source:t,version:s})=>{L.model.sourceDisplayed(t,s)})),u.disposed.connect((()=>{u=null,m=null,e.commands.notifyCommandChanged()})),e.shell.add(u,"down",{ref:t.ref,mode:t.insertMode}),C.add(u),e.shell.activateById(u.id),u.update(),e.commands.notifyCommandChanged()};function w(e){if(u&&e===u)return;let t;t=e&&o.has(e)?e.context.path:null,m&&(m.source=t),L.model.source=t}if(e.commands.addCommand(f.open,{label:h.__("Show Log Console"),execute:(e={})=>{u?u.dispose():y(e)},isToggled:()=>null!==u}),e.commands.addCommand(f.addCheckpoint,{execute:()=>{var e;null===(e=null==m?void 0:m.logger)||void 0===e||e.checkpoint()},icon:g.addIcon,isEnabled:()=>!!m&&null!==m.source,label:h.__("Add Checkpoint")}),e.commands.addCommand(f.clear,{execute:()=>{var e;null===(e=null==m?void 0:m.logger)||void 0===e||e.clear()},icon:g.clearIcon,isEnabled:()=>!!m&&null!==m.source,label:h.__("Clear Log")}),e.commands.addCommand(f.setLevel,{execute:e=>{(null==m?void 0:m.logger)&&(m.logger.level=e.level)},isEnabled:()=>!!m&&null!==m.source,label:e=>{return h.__("Set Log Level to %1",0===(t=e.level).length?t:t[0].toUpperCase()+t.slice(1));var t}}),r&&r.addItem({command:f.open,category:h.__("Main Area")}),c&&c.registerStatusItem("@jupyterlab/logconsole-extension:status",{item:L,align:"left",isActive:()=>{var e;return(null===(e=L.model)||void 0===e?void 0:e.version)>0},activeStateChanged:L.model.stateChanged}),e.restored.then((()=>{w(t.currentWidget),t.currentChanged.connect(((e,{newValue:t})=>w(t)))})),d){const t=e=>{_.maxLength=e.get("maxLogEntries").composite,L.model.flashEnabled=e.get("flash").composite};Promise.all([d.load(v),e.restored]).then((([e])=>{t(e),e.changed.connect((e=>{t(e)}))})).catch((e=>{console.error(e.message)}))}return _},id:v,provides:n.ILoggerRegistry,requires:[o.ILabShell,r.IRenderMimeRegistry,a.INotebookTracker,c.ITranslator],optional:[l.ICommandPalette,o.ILayoutRestorer,i.ISettingRegistry,d.IStatusBar],autoStart:!0};class b extends l.ReactWidget{constructor(e,t){super(),this.handleChange=e=>{this._logConsole.logger&&(this._logConsole.logger.level=e.target.value),this.update()},this.handleKeyDown=e=>{13===e.keyCode&&this._logConsole.activate()},this._id=`level-${h.UUID.uuid4()}`,this.translator=t||c.nullTranslator,this._trans=this.translator.load("jupyterlab"),this.addClass("jp-LogConsole-toolbarLogLevel"),this._logConsole=e,e.source&&this.update(),e.sourceChanged.connect(this._updateSource,this)}_updateSource(e,{oldValue:t,newValue:s}){null!==t&&e.loggerRegistry.getLogger(t).stateChanged.disconnect(this.update,this),null!==s&&e.loggerRegistry.getLogger(s).stateChanged.connect(this.update,this),this.update()}render(){const e=this._logConsole.logger;return u.createElement(u.Fragment,null,u.createElement("label",{htmlFor:this._id,className:null===e?"jp-LogConsole-toolbarLogLevel-disabled":void 0},this._trans.__("Log Level:")),u.createElement(g.HTMLSelect,{id:this._id,className:"jp-LogConsole-toolbarLogLevelDropdown",onChange:this.handleChange,onKeyDown:this.handleKeyDown,value:null==e?void 0:e.level,"aria-label":this._trans.__("Log level"),disabled:null===e,options:null===e?[]:[[this._trans.__("Critical"),"Critical"],[this._trans.__("Error"),"Error"],[this._trans.__("Warning"),"Warning"],[this._trans.__("Info"),"Info"],[this._trans.__("Debug"),"Debug"]].map((e=>({label:e[0],value:e[1].toLowerCase()})))}))}}const y=L}}]);
//# sourceMappingURL=4171.a7bd277.js.map