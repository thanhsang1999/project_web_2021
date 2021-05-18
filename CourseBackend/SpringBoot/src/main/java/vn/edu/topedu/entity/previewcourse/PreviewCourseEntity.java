package vn.edu.topedu.entity.previewcourse;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import vn.edu.topedu.entity.AHasResource;
import vn.edu.topedu.entity.OwerCourse;
import vn.edu.topedu.entity.ResourceImage;
import vn.edu.topedu.entity.course.full.Learning;
import vn.edu.topedu.entity.course.full.Part;
import vn.edu.topedu.entity.course.full.VideoEntity;

@Entity
@Table(name = "Course")
public class PreviewCourseEntity extends AHasResource {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "img_poster_id", referencedColumnName = "id")
    private ResourceImage poster;
	
	

	@Column(name = "description", length = 255)
	private String description = "";
	@Column(name = "title", length = 255, nullable = false)
	private String title = "";
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "demo_id", referencedColumnName = "id")
	private VideoEntity demo;
	@Column(name = "update_at", nullable = false)
	private Date updateAt = new Date();
	@Column(name = "price", length = 15, nullable = false)
	private BigDecimal price = new BigDecimal(0);
	
	@JsonIgnore
	@Column(name = "Deleted", length = 1, nullable = false)
	private Boolean deleted = false;
	@OneToMany(mappedBy = "course")
	private List<Learning> learning;
	@OneToMany(mappedBy = "course")
	private List<PartReview> parts;
//	@OneToMany(mappedBy = "detailCourseEntity")
//	@JsonIgnore
//	private List<OwerCourse> owerCourse;
	
	

	public List<Learning> getLearning() {
		return learning;
	}

	public PreviewCourseEntity() {
		super();
	}

	public void setLearning(List<Learning> learning) {
		this.learning = learning;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	

	
	public Date getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Date updateAt) {
		this.updateAt = updateAt;
	}

	public VideoEntity getDemo() {
		return demo;
	}

	public void setDemo(VideoEntity demo) {
		this.demo = demo;
	}

	public List<PartReview> getParts() {
		return parts;
	}

	public void setParts(List<PartReview> parts) {
		this.parts = parts;
	}
	
	public ResourceImage getPoster() {
		return poster;
	}

	public void setPoster(ResourceImage poster) {
		this.poster = poster;
	}
	
	@Override
	public void setBeforeResource(String beforeResource) {
		this.poster.setBeforeResource(beforeResource);
		this.demo.setBeforeResource(beforeResource);
		this.parts.forEach(e->e.getLessons().forEach(x-> x.getVideo().setBeforeResource(beforeResource)));
		super.setBeforeResource(beforeResource);
	}
	

	
	


	
	

}