import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('project.mapper test', () => {
  describe('mapProjectFromApiToVm test', () => {
    it.each<apiModel.Project>([undefined, null])(
      'debería retornar un array vacio con la firma de createEmptyProject cuando sea igual a %p',
      (project: any) => {
        // Act
        const emptyProject: apiModel.Project = {
          id: '',
          name: '',
          externalId: '',
          comments: '',
          isActive: false,
          employees: [],
        };

        // Arrange
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        expect(result).toEqual(emptyProject);
      }
    );

    it('debería retornar un proyecto pero sin empleados asignados', () => {
      // Arrange
      const projectWhitoutEmployee: apiModel.Project = {
        id: '001',
        name: 'máster lemoncode',
        externalId: '123',
        comments: 'hello',
        isActive: true,
        employees: [],
      };

      //Act
      const result: viewModel.Project = mapProjectFromApiToVm(
        projectWhitoutEmployee
      );

      // Assert
      expect(result).toEqual(projectWhitoutEmployee);
    });

    it('deberia retornar un proyecto con empleados asignados', () => {
      // Arrange
      const projectWhitEmployee: apiModel.Project = {
        id: '001',
        name: 'Máster lemoconde',
        externalId: '123',
        comments: 'hello',
        isActive: true,
        employees: [
          {
            id: '01',
            isAssigned: true,
            employeeName: 'manuel gallego',
          },
          {
            id: '02',
            isAssigned: true,
            employeeName: 'vicente gallego',
          },
        ],
      };
      //Act
      const result: viewModel.Project =
        mapProjectFromApiToVm(projectWhitEmployee);

      // Assert
      expect(result).toEqual(projectWhitEmployee);
    });

    it('deberia retornar un proyecto sin datos de proyectos pero con empleados asignados', () => {
      // Arrange
      const projectWhitEmployee: apiModel.Project = {
        id: '',
        name: '',
        externalId: '',
        comments: '',
        isActive: false,
        employees: [
          {
            id: '01',
            isAssigned: true,
            employeeName: 'manuel gallego',
          },
          {
            id: '02',
            isAssigned: true,
            employeeName: 'vicente gallego',
          },
        ],
      };
      //Act
      const result: viewModel.Project =
        mapProjectFromApiToVm(projectWhitEmployee);

      // Assert
      expect(result).toEqual(projectWhitEmployee);
    });

    it('deberia retornar un proyecto con algunos datos asignados', () => {
        // Arrange
        const projectoWithSomeData: apiModel.Project = {
          id: '01',
          name: 'Vacaciones',
          externalId: '',
          comments: '',
          isActive: false,
          employees: [
            {
              id: '01',
              isAssigned: true,
              employeeName: 'manuel gallego',
            },
          ],
        };
        //Act
        const result: viewModel.Project =
          mapProjectFromApiToVm(projectoWithSomeData);
  
        // Assert
        expect(result).toEqual(projectoWithSomeData);
      });


  });
});
