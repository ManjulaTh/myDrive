package com.cooksys.mydrive.repository;

import org.springframework.data.repository.CrudRepository;

import com.cooksys.mydrive.model.FolderModel;

public interface FolderRepository extends CrudRepository<FolderModel, Long> {

}
