const menuItems = () => {
  return [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        alert('clicou')
      }
    },
    {
      label: 'Departamentos',
      icon: 'pi pi-building',
      items: [
        {
          label: 'Ações',
          items: [
            {
              label: 'Listar',
              icon: 'pi pi-table',
              command: () => {
                alert('clicou')
              }
            },
            {
              label: 'Cadastrar',
              icon: 'pi pi-file-plus',
              command: () => {
                alert('clicou')
              }
            },

          ]
        }
      ]
    }
  ]
}

export default menuItems