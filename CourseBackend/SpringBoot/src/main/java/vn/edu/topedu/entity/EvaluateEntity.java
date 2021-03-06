package vn.edu.topedu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.annotation.JsonIgnore;

import vn.edu.topedu.entity.course.full.FullCourse;
import vn.edu.topedu.entity.previewcourse.PreviewCourseEntity;
import vn.edu.topedu.utils.WebUtils;

@Entity
@Table(name = "evaluates")
public class EvaluateEntity extends BaseEntity {
	
	@Column(name = "user_poster_id", nullable = false)
	@JsonIgnore
	private Long userPosterId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_poster_id", nullable = false, insertable = false, updatable = false)
	@JsonIgnore
	private AppUser userPoster;
	
	@Column(name = "content")
	private String content = "";
	
	@Column(name = "rating")
	private Double rating = 0.0;
	
	@Column(name = "course_id", nullable = false)
	@JsonIgnore
	private Long courseId;
	@ManyToOne
	@JoinColumn(name = "course_id",insertable = false, updatable = false)
	@JsonIgnore
	private FullCourse fullCourse;
	
	@ManyToOne
	@JoinColumn(name = "course_id",insertable = false, updatable = false)
	@JsonIgnore
	private PreviewCourseEntity previewCourseEntity;
	
	

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	

	public FullCourse getFullCourse() {
		return fullCourse;
	}

	public void setFullCourse(FullCourse fullCourse) {
		this.fullCourse = fullCourse;
	}

	public PreviewCourseEntity getPreviewCourseEntity() {
		return previewCourseEntity;
	}

	public void setPreviewCourseEntity(PreviewCourseEntity previewCourseEntity) {
		this.previewCourseEntity = previewCourseEntity;
	}

	public Long getUserPosterId() {
		return userPosterId;
	}

	public void setUserPosterId(Long userPosterId) {
		this.userPosterId = userPosterId;
	}

	public AppUser getUserPoster() {
		return userPoster;
	}

	public void setUserPoster(AppUser userPoster) {
		this.userPoster = userPoster;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}
	public String getFullname() {
		if(userPoster==null) return null; else return userPoster.getFullname();
	}
	
	public String getUsername() {
		if(userPoster==null) return null; else return userPoster.getUsername();
	}
	public String getAvatar() {
		if(userPoster==null) return null; else return userPoster.getAvatar().getImage();
	}
	
	public boolean getBlocked() {
		if(userPoster==null) return false; else return userPoster.getBlocked();
	}
	public void setBeforeResource(HttpServletRequest httpServletRequest) {
		
		String beforeResource = WebUtils.getUrl(httpServletRequest);
		
		if (this.userPoster != null)
			this.userPoster.setBeforeResource(beforeResource);
//		if (this.parts != null)
//			this.parts.forEach(e -> {
//				if (e.getLessons() != null)
//					e.getLessons().forEach(x -> {
//						if (x.getVideo() != null)
//							x.getVideo().setBeforeResource(beforeResource);
//					});
//			});

	}
	

}
