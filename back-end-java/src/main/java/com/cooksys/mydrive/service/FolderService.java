package com.cooksys.mydrive.service;

import org.springframework.stereotype.Service;

import com.cooksys.mydrive.repository.FolderRepository;

@Service
public class FolderService {

	private FolderRepository folderRepository;

	public FolderService(FolderRepository folderRepository) {
		this.folderRepository = folderRepository;
	}

}
