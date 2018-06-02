package com.cooksys.mydrive.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class FolderEntity {

	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	private Boolean trash;
	
	public FolderEntity() {}
}
