package com.cooksys.mydrive.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cooksys.mydrive.entity.FileEntity;
import com.cooksys.mydrive.entity.FolderEntity;
import com.cooksys.mydrive.repository.FileRepository;
import com.cooksys.mydrive.repository.FolderRepository;

@Service
public class FolderService {

	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	public FolderService(FileRepository fileRepository, FolderRepository folderRepository) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}

	public ResponseEntity<?> getAll(Boolean trash) {
		if (trash == null) {
			trash = false;
		}
		List<FolderEntity> folderList = new ArrayList<>();
		Iterable<FolderEntity> folderIterable = folderRepository.findAllByTrash(trash);
		folderIterable.forEach(folderList::add);
		return ResponseEntity.ok(folderList);
	}

	public ResponseEntity<?> get(Long id) {
		Optional<FolderEntity> folderOptional = folderRepository.findById(id);
		if (folderOptional.isPresent()) {
			FolderEntity folder = folderOptional.get();
			List<FileEntity> fileList = new ArrayList<>();
			Iterable<FileEntity> fileIterable = fileRepository.findAllByFolderId(id);
			fileIterable.forEach(fileList::add);
			return ResponseEntity.ok(folder);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> createFolder(String name) {
		FolderEntity folderTemp = new FolderEntity(name, null, false);
		folderRepository.save(folderTemp);
		return ResponseEntity.ok(folderTemp);
	}

	public ResponseEntity<?> deleteFolder(Long id) {
		Optional<FolderEntity> folderOptional = folderRepository.findById(id);
		if (folderOptional.isPresent()) {
			folderOptional.get().getFiles().iterator().forEachRemaining(file -> fileRepository.delete(file));
			folderRepository.deleteById(id);
			return ResponseEntity.ok(id);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<?> addFileToFolder(Long folderId, Long fileId) {
		Optional<FileEntity> fileOptional = fileRepository.findById(fileId);
		Optional<FolderEntity> folderOptional = folderRepository.findById(folderId);
		if (fileOptional.isPresent() && folderOptional.isPresent()) {
			FileEntity file = fileOptional.get();
			FolderEntity folder = folderOptional.get();
			folder.getFiles().add(file);
			folderRepository.save(folder);
			return ResponseEntity.ok(folder);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> removeFileFromFolder(Long folderId, Long fileId) {
		Optional<FileEntity> fileOptional = fileRepository.findById(fileId);
		Optional<FolderEntity> folderOptional = folderRepository.findById(folderId);
		if (fileOptional.isPresent() && folderOptional.isPresent()) {
			FileEntity file = fileOptional.get();
			FolderEntity folder = folderOptional.get();
			folder.getFiles().remove(file);
			folderRepository.saveAndFlush(folder);
			return ResponseEntity.ok(folder);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
