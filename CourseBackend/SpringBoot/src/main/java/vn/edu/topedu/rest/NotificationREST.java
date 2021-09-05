package vn.edu.topedu.rest;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.topedu.dao.AppUserDAO;
import vn.edu.topedu.dao.NotificationDAO;
import vn.edu.topedu.entity.AppUser;
import vn.edu.topedu.entity.NotificationEntity;
import vn.edu.topedu.entity.course.Course;
import vn.edu.topedu.response.MessageResponse;
import vn.edu.topedu.response.PageResponse;
import vn.edu.topedu.response.PageResponse.Pagination;
@RestController
@RequestMapping("/notification")
public class NotificationREST {
	@Autowired
	private AppUserDAO appUserDAO;
	
	@Autowired
	private NotificationDAO notificationDAO;
	
	
	@GetMapping(value="list")
	@ResponseBody
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Object> updateRating(
			HttpServletRequest httpServletRequest, 
			Authentication authentication	,
			@RequestParam(defaultValue = "1") int _page,
			@RequestParam(defaultValue = "10") int _limit,
			@RequestParam(defaultValue = "id:asc") String _sort, 
			@RequestParam(defaultValue = "") String _search
			) {
		System.out.println("---------------------------------");
		
		
		if (authentication != null) {
			authentication.getName();
			AppUser appUser = appUserDAO.findUserAccount(authentication.getName());
			if (appUser != null) {		
				
				try {
					List<NotificationEntity> rs = notificationDAO.getData(appUser.getId(),_page,_limit,_sort,_search);					
					Long count = notificationDAO.countData(appUser.getId(),_search);					
					for(NotificationEntity e: rs) {						
						//e.getUserPoster().getAvatar().setBeforeResource(WebUtils.getUrl(httpServletRequest));
					}
					
					
					@SuppressWarnings({ "rawtypes", "unchecked" })
					PageResponse<Course> pageResponse = new PageResponse(rs, _limit, _page, count, new Pagination() {
						public String get_sort() {
							return _sort;
						}

					});
					
					return ResponseEntity.ok(pageResponse);
				} 
				catch (NoResultException e) {
					System.err.println(e.getMessage());
					@SuppressWarnings({ "rawtypes", "unchecked" })
					PageResponse<Course> pageResponse = new PageResponse(new ArrayList<>(), 1, 1, 0, new Pagination() {
						public String get_sort() {
							return _sort;
						}

					});
					
					return ResponseEntity.ok(pageResponse);
				}
				catch (Exception e) {
					System.err.println(e.getMessage());
					return ResponseEntity.badRequest().body(new MessageResponse("List ratings not ready", "Không thể lấy danh sách ratings"));
				}
				
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Error.", "Lỗi không xác định"));
	}
	
}