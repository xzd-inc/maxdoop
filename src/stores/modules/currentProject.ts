import { defineStore } from 'pinia'
import { ref } from 'vue';

export default defineStore('currentProject', () =>{
  const project = ref({ projectName: '' })
  const setProject = (projectData: any) => {
    project.value = projectData
  }

  const projectValue = ref<any[]>([])
  const setProjectValue = (value) => {
    projectValue.value = value
  }
  return { project, setProject, projectValue, setProjectValue };
})