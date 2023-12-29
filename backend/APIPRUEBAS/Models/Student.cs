using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;

namespace APIPRUEBAS.Models
{
    public partial class Student
    {
        public int ID { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public DateTime dateOfBirth { get; set; }
        public int nationalID { get; set; }
        public virtual List<FamilyMember>? familyMembers { get; set; }
    }
}