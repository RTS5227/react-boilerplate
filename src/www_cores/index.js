/**
 * Created by ltlam on 15/12/2016.
 */
export Link from './Link'
export DocumentTitle from './DocumentTitle'
export DevTools from './DevTools'
export RePagination from './RePagination'
import ReToastr, * as fromReToast from './Toastr2'
const toastr = Object.assign({}, fromReToast.toastr, fromReToast);
export {ReToastr, toastr};
