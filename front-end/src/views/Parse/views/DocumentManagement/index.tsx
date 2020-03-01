import React, {
  FormEvent,
  useState,
} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {useCollection} from '../../../../lib/Parse/hooks';
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from 'mui-datatables';
import {RequestStatus} from '../../../../lib/Parse/enums';
import LoadingPage from '../../../Status/LoadingPage';
import AddIcon from '@material-ui/icons/Add';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {SaveCancelFormButton} from '../../../components/SaveCancelFromButton';
import Parse from 'parse';
import {useHandleError} from '../../../../lib/Parse/hooks/useHandleError';

/**
 * A interface that contains a field name and a renderer callback
 * to convert the field object to a string
 */

/*interface FieldRenderer {
 [index: string]: ((
 value: any, tableMeta: MUIDataTableMeta,
 updateValue: (s: any, c: any, p: any) => any,
 ) => string | React.ReactNode) | undefined
 }*/

interface DocumentManagementInterface {
  documentName: string,
  /**
   * The field name of the document
   */
  fieldName?: string,
  /**
   * The label of the field
   */
  fieldLabel?: string,
  tableTitle: string | React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatingActionBar: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

/*interface SortAscendingInterface {
 ascending: string,
 }
 
 interface SortDescendingInterface {
 descending: string
 }*/

/**
 * This component is used to manage Documents with a single field
 * <code>fieldName</code>.
 * @param documentName
 * @param fieldName The field name of the document. Defaults to
 *     <code>name</code>
 * @param fieldLabel The label of the field. Defaults to <code>Nome</code>
 * @param tableTitle
 * @constructor
 */
export const DocumentManagement: React.FC<DocumentManagementInterface> =
  (
    {
      documentName,
      fieldName = 'name',
      fieldLabel = 'Nome',
      tableTitle,
    }) => {
    
    const classes = useStyles();
    const [documents, requestStatus] = useCollection(
      documentName,
      {
        ascending: fieldName,
        fieldName,
        liveQueryOn: true,
      },
    );
    const [newDocumentName, setNewDocumentName] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [, setSaving] = useState(false);
    const handleError = useHandleError();
    
    if (requestStatus === RequestStatus.loading) {
      return <LoadingPage/>;
    }
    
    const columns: MUIDataTableColumnDef[] = [
      {
        name: fieldName || 'name',
        label: fieldLabel || 'Nome',
        options: {
          filter: true,
          sort: true,
        },
        
      },
    ];
    
    const data: Array<object | number[] | string[]> = documents.map(document => document.toJSON());
    
    const options: MUIDataTableOptions = {
      responsive: 'scrollFullHeight',
      pagination: false,
      print: false,
      download: false,
      viewColumns: false,
      filter: false,
      // @ts-ignore
      onRowsDelete: (rowsDeleted: { lookup: { [index: number]: boolean }, data: { index: number, dataIndex: number }[] }) => {
        const documentsToDelete = rowsDeleted.data.map((row: { dataIndex: number, index: number }) => {
          return documents[row.dataIndex];
        });
        
        Parse.Object.destroyAll(documentsToDelete)
          .then(
            () => {
            },
            handleError,
          )
          .catch(handleError);
      },
    };
    
    function handleClose() {
      setOpenAddDialog(false);
    }
    
    function handleSubmit(event: FormEvent) {
      event.preventDefault();
      const object = new Parse.Object(documentName);
      object.set(fieldName, newDocumentName);
      setSaving(true);
      object.save()
        .then(
          () => {
          },
          handleError,
        )
        .catch(
          async (error) => {
            setSaving(false);
            await handleError(error);
          },
        )
        .finally(() => handleClose());
    }
    
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MUIDataTable
              columns={columns}
              data={data}
              title={tableTitle}
              options={options}
            />
          </Grid>
        </Grid>
        <div className={classes.floatingActionBar}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item xs>
              <Tooltip
                title={'Cadastrar Cidade'}
                aria-label={'Vincular Data Logger'}
                placement={'left'}>
                <Fab
                  size={'medium'}
                  color={'secondary'}
                  onClick={() => {
                    setOpenAddDialog(true);
                  }}
                >
                  <AddIcon/>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
        <Dialog open={openAddDialog} onClose={handleClose}>
          <DialogTitle>Cadastrar</DialogTitle>
          <form
            onSubmit={handleSubmit}
          >
            <DialogContent>
              <TextField
                fullWidth
                variant={'outlined'}
                label={fieldLabel}
                onChange={(event) => {
                  setNewDocumentName(event.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <SaveCancelFormButton onNavigateBack={handleClose}/>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  };
