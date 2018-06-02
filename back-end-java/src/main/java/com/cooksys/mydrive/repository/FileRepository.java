package com.cooksys.mydrive.repository;

import org.springframework.data.repository.CrudRepository;

import com.cooksys.mydrive.entity.FileEntity;

public interface FileRepository extends CrudRepository<FileEntity, Long> {

}
