package com.cooksys.mydrive;

import javax.transaction.Transactional;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.cooksys.mydrive.entity.FolderEntity;
import com.cooksys.mydrive.repository.FileRepository;
import com.cooksys.mydrive.repository.FolderRepository;

@Component
public class InitialDataLoader {
	
	@SuppressWarnings("unused")
	private FileRepository fileRepository;
	private FolderRepository folderRepository;
	
	public InitialDataLoader(FileRepository fileRepository, FolderRepository folderRepository) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}
	
	@EventListener
	@Transactional
	public void handleContextRefresh(ContextRefreshedEvent event) {
		FolderEntity folder = new FolderEntity();
		folder.setName("master");
		folder.setTrash(false);
		folderRepository.saveAndFlush(folder);
		
		folder = new FolderEntity();
		folder.setName("testing");
		folder.setTrash(false);
		folderRepository.saveAndFlush(folder);
	}

}
