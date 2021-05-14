package vn.edu.topedu.response;

import java.util.List;

import vn.edu.topedu.entity.course.Course;

public class PageResponse {
	
	private List<Course> data;
	private Pagination pagination;
	
	public PageResponse(List<Course> lstCourse,int _limit, int _page, long _totalRows, String _sort, String _filter) {
		super();
		this.data = lstCourse;
		this.pagination = new Pagination(_limit, _page, _totalRows,_sort,_filter);
	}

	public class Pagination{
		private int _limit;
		private int _page;
		private long _totalRows;
		private String _sort;
		private String _filter;
		public Pagination(int _limit, int _page, long _totalRows,String _sort, String _filter) {
			super();
			this._limit = _limit;
			this._page = _page;
			this._totalRows = _totalRows;
			this._sort=_sort;
			this._filter=_filter;
		}
		public int get_limit() {
			return _limit;
		}
		public void set_limit(int _limit) {
			this._limit = _limit;
		}
		public int get_page() {
			return _page;
		}
		public void set_page(int _page) {
			this._page = _page;
		}
		public long get_totalRows() {
			return _totalRows;
		}
		public void set_totalRows(long _totalRows) {
			this._totalRows = _totalRows;
		}
		public String get_sort() {
			return _sort;
		}
		public void set_sort(String _sort) {
			this._sort = _sort;
		}
		public String get_filter() {
			return _filter;
		}
		public void set_filter(String _filter) {
			this._filter = _filter;
		}
		
		
		
		
	}

	public List<Course> getData() {
		return data;
	}

	public void setData(List<Course> data) {
		this.data = data;
	}

	public Pagination getPagination() {
		return pagination;
	}

	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

}
