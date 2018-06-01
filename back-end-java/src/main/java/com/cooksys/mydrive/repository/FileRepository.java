package com.cooksys.mydrive.repository;

import org.springframework.data.repository.CrudRepository;

import com.cooksys.mydrive.model.FileModel;

public interface FileRepository extends CrudRepository<FileModel, Long> {

}
