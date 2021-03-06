package vn.edu.topedu.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categories")
public class CategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "actived")
	private Boolean actived = true;

	@Column(name = "Create_Time", nullable = false, updatable = false)
	private Date createTime = new Date();

	@Column(name = "Update_Time", nullable = false)
	private Date updateTime = new Date();

	@Column(name = "deleted", length = 1, nullable = false)
	private Boolean deleted = false;

	@Column(name = "total_course", nullable = false, updatable = false)
	private Long total = Long.valueOf(0);

	@Column(name = "duration_learned", nullable = false)
	private BigDecimal durationLearned = new BigDecimal(0);

	@Column(name = "total_money", nullable = false, updatable = false)
	private BigDecimal totalMoney = new BigDecimal(0);

	public BigDecimal getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(BigDecimal totalMoney) {
		this.totalMoney = totalMoney;
	}

	public BigDecimal getDurationLearned() {
		return durationLearned;
	}

	public void setDurationLearned(BigDecimal durationLearned) {
		this.durationLearned = durationLearned;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getActived() {
		return actived;
	}

	public void setActived(Boolean active) {
		this.actived = active;
	}

	@Override
	public String toString() {
		return "CategoryEntity [id=" + id + ", name=" + name + ", actived=" + actived + ", createTime=" + createTime
				+ ", updateTime=" + updateTime + ", deleted=" + deleted + ", total=" + total + ", durationLearned="
				+ durationLearned + ", totalMoney=" + totalMoney + "]";
	}
	
	

}
