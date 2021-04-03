package vn.edu.topedu.dao;
 
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import fileprocess.FileProcess;
import vn.edu.topedu.entity.Course;
import vn.edu.topedu.entity.UserCourse;
import vn.edu.topedu.entity.UserRole;
import vn.edu.topedu.response.model.CourseResponse;
 
@Repository
@Transactional
public class UserCourseDAO {
 
    @Autowired
    private EntityManager entityManager;
 
    public List<Course> getOwerCourse(Long userId) {
        String sql = "Select uc.course from " + 
        		UserCourse.class.getName() + " uc " //
                + " where uc.appUser.userId = :userId ";
 
        Query query = this.entityManager.createQuery(sql, Course.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
    
    public CourseResponse getCourse(int id) {
		String sql = "Select new vn.edu.topedu.response.model.CourseResponse( "+
    "uc.course.id,uc.course.title, uc.course.description, uc.course.poster,uc.appUser.avatar, uc.appUser.userName,uc.course.ratestar, uc.course.price, uc.course.bought "
				+") from " + UserCourse.class.getName() + " uc " //
				+ " where uc.course.deleted=0 and uc.course.id= :id group by uc.course.id order by uc.course.id desc ";
		Query query = this.entityManager.createQuery(sql, CourseResponse.class);
		query.setParameter("id", id);
		
		return (CourseResponse) query.getSingleResult();
	}
    public List<CourseResponse> getListCourse(int _page, int _limit) {
    	--_page;
    	String sql = "Select new vn.edu.topedu.response.model.CourseResponse( "+
    			"uc.course.id,uc.course.title, uc.course.description, uc.course.poster,uc.appUser.avatar, uc.appUser.userName,uc.course.ratestar, uc.course.price, uc.course.bought "
    			+") from " + UserCourse.class.getName() + " uc " //
    			+ " where uc.course.deleted=0  group by uc.course.id order by uc.course.id desc ";
    	Query query = this.entityManager.createQuery(sql, CourseResponse.class);
    	
    	query.setFirstResult(_page*_limit);
		query.setMaxResults(_limit);
    	return query.getResultList();
    }
   
 
}