import React, { useEffect,useState, useMemo, useCallback} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {fetchAutocomplete, setCurrentCity, setSearchList } from "../../actions";
import debounce from "lodash.debounce"
import {Input, AutoComplete} from "antd";

const SearchBlock = ({searchList}) => {
    const dispatch=useDispatch()
    const [text,setText] = useState('')
    const [isEng, setIsEng] = useState(true)


    useEffect(()=>{
        text ? dispatch((fetchAutocomplete(text))) : dispatch(setSearchList(null))
    },[text])

    const searches = useCallback((searchList)=>{
        if( searchList !== null && searchList.length===0 ) {
            return [{value: "Sorry, nothing found"}]
        }
        else if(searchList === null){
            return []
        }else {
            return searchList.map((item)=>{
                const searchResult = `${item.LocalizedName}, ${item.Country.LocalizedName}`
                return {
                    value: searchResult,
                    key: item.Key
                }
            })
        }
    }, [])

    const debounceChange = useMemo(() => {
        return debounce((e)=>{setText(e.target.value) },600)
    },[])


    const handleChange=useCallback(
        (e)=>{
              const testLang = e.target.value.match(/[^a-z\-\s]/gi);
              if(testLang){
                  setIsEng(false)
              }else{
                  debounceChange(e)
                  setIsEng(true)
              }
        }, []
    )



    const onSelect = (value, options)=>{
        dispatch(setCurrentCity({key: options.key, name: value}))
    }


    return (
        <Wrapper>
            <StyledAutoComplete
                style={{width: '100%'}}
                options={searches(searchList)}
                onSelect={onSelect}
                // onSearch={handleSearch}
            >
                <StyledInput  onChange={handleChange} iserror={isEng? 0:1} size="large" placeholder="Type city here" enterButton/>
            </StyledAutoComplete>
            <ErrorBlock>
                {!isEng && 'Only English letters'}
            </ErrorBlock>


        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 30px 0 0 0;
  position: relative;
  margin-bottom: 30px;
  
`
const StyledAutoComplete = styled(AutoComplete)`
  position: relative;
 .ant-input-group-addon{
   background-color: transparent;
   border-radius: 18px!important;
   border: none;
  
  
 }
  button{
    background-color: ${p=>p.theme.color.primary_second};
    border-radius: 18px!important;
    width: 100px;
    z-index: 2;
    position: absolute;
    top:0;
    right: 0;
  }
`
const StyledInput = styled(Input.Search)`
  input{
    border-radius: 18px!important;
    background-color: ${p=>p.theme.color.primary};
    color: ${p=>p.theme.color.text_secondary};
    border-right: none;
    &:focus{
      border-color: ${p=>p.iserror ? 'red': p=>p.theme.color.primary_second}!important;
    }
    
  }
  
`


const ErrorBlock= styled.div`
  color: #e25050;
  padding: 2px;
  font-size: 16px;
  min-height: 30px;
`


export default SearchBlock;