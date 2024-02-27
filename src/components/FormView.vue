<template>
  <div>
    <h2> Форма создания клиента</h2>
    <h5> Пункты со звездочкой "*" обязательны к заполнению</h5>
    <div class="container">
      
      <p
        id="pName"
        :class="{red: (!$v.name.alpha2 || !$v.name.required)}"
        > Введите имя*</p>
      <label 
        for="pName"
        class="smallText"
        v-if="!$v.name.alpha2 && $v.name.required"
        >Имя не должно содержать цифр!</label>
      <input 
        v-model="name" 
        type="text" 
        placeholder="Имя">


      <p
        id="pSurname"
        :class="{red: (!$v.surname.alpha2 || !$v.surname.required)}"
        > Введите фамилию*</p>
      <label 
        for="pSurname"
        class="smallText"
        v-if="!$v.surname.alpha2 && $v.surname.required"
        >Фамилия не должна содержать цифр!</label>
      <input 
        v-model="surname" 
        type="text" 
        placeholder="Фамилия">


      <p> Введите отчество </p>
      <input 
        v-model="patronymic" 
        type="text" 
        placeholder="Отчество"> 


      <p
        :class="{ red: ( birthDate() ) }"
        name="pBirthdate"
      > Дата рождения*</p>
      <label 
        for="pBirthdate"
        class="smallText"
        v-if="!$v.bithDateDay.minValue || 
        !$v.bithDateYear.minValue|| 
        !$v.bithDateDay.maxValue|| 
        !$v.bithDateYear.maxValue"
        >Неверно указан день или год!</label>
      <div class="dataInput">
        <input 
          v-model="bithDateDay" 
          type="number" 
          placeholder="День">
        <select v-model="bithDateMonth">
          <option value="01">Январь</option>
          <option value="02">Февраль</option>
          <option value="03">Март</option>
          <option value="04">Апрель</option>
          <option value="05">Май</option>
          <option value="06">Июнь</option>
          <option value="07">Июль</option>
          <option value="08">Август</option>
          <option value="09">Сентрябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>
        <input 
          v-model="bithDateYear" 
          type="number" 
          placeholder="Год">
      </div>


      <p 
      :class="{red: (!$v.phoneNumber.required || !$v.phoneNumber.numeric || !$v.phoneNumber.minLength || !$v.phoneNumber.maxLength)}"
      name="pPhone"
      > Номер телефона* </p>
      <label 
        for="pPhone"
        class="smallText"
        v-if="!$v.phoneNumber.maxLength"
        >Слишком длинный номер телефона!</label>
      <label 
        for="pPhone"
        class="smallText"
        v-if="!$v.phoneNumber.numeric"
        >В номере не должно быть букв!</label>
      <input 
        @click="phoneNumber = '7'"
        @input="numberCorrector()"
        v-model="phoneNumber" 
        type="text" 
        placeholder="+7 ### ### ## ##">


      <p> Пол </p>
      <input 
        v-model="sex" 
        type="text" 
        placeholder="Муж/Жен"> 


      <p :class="{red: (!$v.selectGroupList.required)}"> Группа клиентов* </p>
      <!-- <button v-if="!selectGroup" @click="selectGroup = !selectGroup" >Добавить группу</button> -->
      <p class="smallText">{{ selectGroupList.join(", ")}}</p>
      <p 
        class="smallText" 
        v-if="!$v.selectGroupList.required"
        > (Группы не выбраны)</p>
      <select 
        v-if="selectGroupList.length < 3" 
        v-model="groupSelector"
        > 
        <option 
          v-if="!selectGroupList.includes('VIP')" 
          value="VIP"
          @click="selectGroupList.push('VIP')"
          > VIP </option>
        <option 
          v-if="!selectGroupList.includes('TroubleMakers')" 
          value="TroubleMakers"
          @click="selectGroupList.push('TroubleMakers')"
          > Проблемные </option>  
        <option 
          v-if="!selectGroupList.includes('OMS')" 
          value="OMS"
          @click="selectGroupList.push('OMS')"
          > ОМС </option>
      </select>
      <button 
        v-if="groupSelector && selectGroupList.length < 3" 
        @click="addGroup()" 
        >Добавить</button>
      <button 
        v-if="selectGroupList.length" 
        @click="removeGroup()" 
        >Сброс</button>
      <!-- (Мультиселектор). Значения: [VIP, Проблемные, ОМС] -->
      <!-- Я не уверен стоило ли мне использовать мультиселектор из html "<select multiple>" -->
      <!-- потому что не думаю что его можно считать удобным и интуитивно понятным -->
      <!-- поэтому сделал более интуитивно понятную  альтернативу -->


      <p> Лечащий врач </p>
      <select v-model="doctorSelector">
        <option value="Ivanov">Иванов</option>
        <option value="Zacharov">Захаров</option>
        <option value="Chernisheva">Чернышева</option>
      </select>
      <!-- (Cелектор). Значения: [Иванов, Захаров, Чернышева] -->


      <label for="checkboxForSMS">Не отправлять смс</label>
      <input
        type="checkbox" 
        id="checkboxForSMS" 
        class="checkbox"
        v-model="checkboxSMS"
        >
      <!-- (Чекбокс) -->
      

      <h3> Адресс </h3>
      <p> Индекс </p>
      <input 
      v-model="adrIndex"
      type="text" 
      placeholder="Индекс">


      <p> Страна </p>
      <input 
      v-model="adrCountry" 
      type="text" 
      placeholder="Страна">


      <p> Область </p>
      <input 
      v-model="adrRegion"
      type="text" 
      placeholder="Область">


      <p
        :class="{red: !$v.adrCity.required}"
        > Город* </p>
      <input 
      v-model="adrCity"
      type="text" 
      placeholder="Город">


      <p> Улица </p>
      <input 
      v-model="adrStreet"
      type="text" 
      placeholder="Улица">

      <p> Дом </p>
      <input 
      v-model="adrHouse"
      type="text" 
      placeholder="Дом">


      <h3> Паспорт </h3>

      
      <p
        :class="{red: !$v.docTypeSelector.required}"
        > Тип документа* </p> 
      <select v-model="docTypeSelector">
        <option value="passport">Паспорт</option>
        <option value="birthCertificate">Свидетельство о рождении</option>
        <option value="driverLicense">Вод. удостоверение</option>
      </select>
      <!-- Селектор, Значения: [Паспорт, Свидетельство о рождении, Вод. удостоверение] -->


      <p> Серия </p>
      <input 
      v-model="docSeries" 
      type="text" 
      placeholder="## ##">


      <p> Номер </p>
      <input 
      v-model="docNumber"
      type="text" 
      placeholder="######">


      <p> Кем выдан </p>
      <input  
      v-model="docIssuer"
      type="text" 
      placeholder="Название организации">


      <p
        :class="{ red: ( docDate() ) }"
      > Дата выдачи*</p>
      <div class="dataInput">
        <input 
          v-model="docDateDay" 
          type="number" 
          placeholder="День">
        <select v-model="docDateMonth">
          <option value="01">Январь</option>
          <option value="02">Февраль</option>
          <option value="03">Март</option>
          <option value="04">Апрель</option>
          <option value="05">Май</option>
          <option value="06">Июнь</option>
          <option value="07">Июль</option>
          <option value="08">Август</option>
          <option value="09">Сентрябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>
        <input 
          v-model="docDateYear" 
          type="number" 
          placeholder="Год">
      </div>
      <button @click="submitForm()"> Сохранить пользователя </button>


      <br>
      <br>
    </div>
  </div>
</template>

<script>
import { required, minValue, maxValue, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'


const alpha2 = helpers.regex('alpha2', /^[a-zA-Zа-яА-Я]*$/)

export default {
  name: 'FormView',
  props: {
    msg: String
  },
  data(){
    return {
      name: null, //*
      surname: null,  //*
      patronymic: null,
      bithDateDay: null,
      bithDateMonth: null,
      bithDateYear: null,

      phoneNumber: null,  //* 11 Цифр, начиная с 7
      sex: null,
      groupSelector: null,  //*
      selectGroupList: [],
      doctorSelector: null,
      checkboxSMS: false,

      adrIndex: null,
      adrCountry: null,
      adrRegion: null,
      adrCity: null, //*
      adrStreet: null,
      adrHouse: null,

      docTypeSelector: null, //*
      docSeries: null, 
      docNumber: null, 
      docIssuer: null, 
      // docDate: null //*
      docDateDay: null,    //*
      docDateMonth: null,  //*   
      docDateYear: null  //*



    }
  },
  validations () {
    return {
      name: { required, alpha2 }, //*
      surname:  { required, alpha2 },  //*
      patronymic:  {},
      bithDateDay: { required, minValue: minValue(1), maxValue: maxValue(31)},
      bithDateMonth: { required },
      bithDateYear: { required, minValue: minValue(1900), maxValue: maxValue(2006) },
      phoneNumber:  { required, minLength: minLength(11), maxLength: maxLength(11), numeric },  //* 11 Цифр, начиная с 7
      sex:  {},
      groupSelector:  {},  
      selectGroupList:  { required }, //*
      doctorSelector:  {},
      checkboxSMS:  {},

      adrIndex:  {},
      adrCountry:  {},
      adrRegion:  {},
      adrCity:  { required }, //*
      adrStreet:  {},
      adrHouse:  {},

      docTypeSelector:  { required }, //*
      docSeries:  {}, 
      docNumber:  {}, 
      docIssuer:  {}, 
      docDateDay: { required, minValue: minValue(1), maxValue: maxValue(31) },    //*
      docDateMonth: { required },  //*   
      docDateYear: { required, minValue: minValue(1900), maxValue: maxValue(2006) }  //*
    }
  },
  methods:{
    addGroup(){
      this.selectGroupList.push(this.groupSelector)
      this.groupSelector = null
    },
    removeGroup(){
      this.selectGroupList = []
      this.groupSelector = null
    },
    numberCorrector(){
      if (this.phoneNumber=='') this.phoneNumber = '7'
      else if (this.phoneNumber[0] != 7) this.phoneNumber = 7    
    },
    birthDate(){
      if (!this.$v.bithDateDay.required || 
      !this.$v.bithDateDay.minValue || 
      !this.$v.bithDateDay.maxValue ||
      !this.$v.bithDateMonth.required ||
      !this.$v.bithDateYear.required ||
      !this.$v.bithDateYear.minValue ||
      !this.$v.bithDateYear.maxValue){
        return true
      }else{
        false
      } 
    },
    docDate(){
      if (!this.$v.docDateDay.required || 
      !this.$v.docDateDay.minValue || 
      !this.$v.docDateDay.maxValue ||
      !this.$v.docDateMonth.required ||
      !this.$v.docDateYear.required ||
      !this.$v.docDateYear.minValue ||
      !this.$v.docDateYear.maxValue){
        return true
      }else{
        false
      }
    },
    async submitForm(){
      const isFormCorrect = await this.$v.$invalid
      if (!isFormCorrect)
        alert("Пользователь успешно создан!")
      else
        alert("Не все обязательные поля заполнены корректно!")
    } 
  }
}
</script>

