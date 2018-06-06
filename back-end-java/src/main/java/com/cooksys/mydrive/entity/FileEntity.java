package com.cooksys.mydrive.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class FileEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private String mimetype;
	
	@ManyToOne
	private FolderEntity folder;
	
	private byte[] content;
	
	private Boolean trash;
	
	public FileEntity() {}

	public FileEntity(String name, String mimetype, FolderEntity folder, byte[] content, Boolean trash) {
		this.name = name;
		this.mimetype = mimetype;
		this.folder = folder;
		this.content = content;
		this.trash = trash;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonIgnore
	public String getMimetype() {
		return mimetype;
	}

	public void setMimetype(String mimetype) {
		this.mimetype = mimetype;
	}
	
	@JsonIgnore
	public FolderEntity getFolder() {
		return folder;
	}
	
	public void setFolder(FolderEntity folder) {
		this.folder = folder;
	}

	@JsonIgnore
	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public Boolean getTrash() {
		return trash;
	}

	public void setTrash(Boolean trash) {
		this.trash = trash;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FileEntity other = (FileEntity) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
