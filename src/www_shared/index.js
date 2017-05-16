export Link from './Link'
export DevTools from './DevTools'

import ReToastr, * as fromReToast from './ReToastr'
const toastr = Object.assign({}, fromReToast.toastr, fromReToast);
export {ReToastr, toastr};