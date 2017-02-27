import React from 'react'
import ReactPaginate from 'react-paginate'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class RePaginationBase extends React.Component {
    static propTypes = {
        query: React.PropTypes.object,
        pathname: React.PropTypes.string,
        dispatcher: React.PropTypes.func
    };

    onSubmit(data) {
        let selected = data.selected;
        let limit = 20;
        let skip = Math.ceil(selected * limit);
        const {dispatch, dispatcher, pathname, query} = this.props;
        if (dispatcher) {
            dispatch(dispatcher(skip, limit))
        } else {
            dispatch(push({
                pathname,
                query: {...query, skip, limit}
            }));
        }
    }

    render() {
        const {metadata} = this.props;
        const {currentPage, pageCount} = metadata;
        if (!pageCount || pageCount <= 1) return null;
        return (
            <ReactPaginate
                previousLabel="Trước"
                nextLabel="Tiếp"
                breakLabel={<span>...</span>}
                breakClassName="break-me"
                pageNum={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                clickCallback={::this.onSubmit}
                forceSelected={currentPage - 1}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"/>
        )
    }
}
const mapStateToProps = state => ({
    metadata: state['pagination']
});
export const RePagination = connect(mapStateToProps)(RePaginationBase);