/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import TaskColumn from './taskColumn';
import ListColumn from './listColumn';
import TaskList from '../../../interfaces/task-List';

class ListModal {
  static block: HTMLDialogElement;

  static title: HTMLElement;

  static input: HTMLInputElement;

  public static createListModal(): HTMLDialogElement {
    ListModal.block = document.createElement('dialog');
    ListModal.block.classList.add('modal');

    const closeButton: HTMLElement = Builder.createBlock(
      ['modal__button', 'modal__button--close'],
      'button',
      '✕',
    );
    const inner: HTMLElement = Builder.createBlock(['modal__inner']);

    ListModal.title = Builder.createBlock(['modal__title'], 'h3');
    ListModal.input = Builder.createInput(
      ['modal__input'],
      'text',
      `${i18next.t('mainScreen.lists.addListPlaceholder')}`,
    );
    const saveButton: HTMLElement = Builder.createBlock(
      ['modal__button', 'modal__button--save'],
      'button',
      `${i18next.t('mainScreen.lists.save')}`,
    );

    inner.append(ListModal.title, ListModal.input, saveButton);
    ListModal.block.append(closeButton, inner);

    ListModal.addListener(ListModal.block);

    return ListModal.block;
  }

  private static addListener(modal: HTMLDialogElement): void {
    modal.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLButtonElement) {
        if (e.target.classList.contains('modal__button--save')) {
          ListModal.createOrEditCustomList()
            .then(() => {})
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        ListModal.block.close();
      }
    });
  }

  private static async createOrEditCustomList() {
    if (ListModal.input.value !== '') {
      if (ListModal.input.dataset.type === 'edit') {
        await Loader.updateTaskList(Number(ListModal.input.dataset.id), {
          name: ListModal.input.value,
        });
      } else {
        await Loader.createTaskList({ name: ListModal.input.value });
      }
      ListColumn.renderCustomLists();
      TaskColumn.menu.draw();
    }
  }

  private static showModal() {
    ListModal.block.showModal();
    ListModal.input.focus();
  }

  public static showAddModal() {
    ListModal.title.textContent = i18next.t('mainScreen.lists.addList');
    ListModal.input.value = '';
    ListModal.input.dataset.type = 'add';

    ListModal.showModal();
  }

  public static showEditModal(list: TaskList) {
    ListModal.title.textContent = i18next.t('mainScreen.lists.editList');
    ListModal.input.value = list.name;
    ListModal.input.dataset.type = 'edit';
    ListModal.input.dataset.id = list.id.toString();

    ListModal.showModal();
  }
}

export default ListModal;
