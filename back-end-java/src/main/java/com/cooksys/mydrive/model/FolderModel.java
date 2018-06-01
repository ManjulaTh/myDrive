package com.cooksys.mydrive.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class FolderModel {

	@Id
	@GeneratedValue
	private long id;
	
	private String name;
	
	private Boolean trash;
	
	public FolderModel() {}
}
